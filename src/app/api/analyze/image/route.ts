import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: "이미지가 필요합니다" },
        { status: 400 },
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `당신은 스캠/피싱 이미지를 분석하는 전문가입니다.
사용자가 제공한 이미지를 분석하여 스캠/피싱 여부를 판단하고, 아래 JSON 형식으로만 응답하세요.

{
  "status": "danger" | "warning" | "safe",
  "riskLevel": 0-100,
  "diagnosis": {
    "title": "진단 제목",
    "summary": "간단한 요약 (1-2문장)",
    "details": ["상세 분석 내용 1", "상세 분석 내용 2", ...]
  },
  "response": {
    "immediate": ["즉시 대응 방법 1", "즉시 대응 방법 2", ...],
    "preventive": ["예방 조치 1", "예방 조치 2", ...]
  },
  "similarScams": [
    {
      "name": "비슷한 수법 이름",
      "description": "설명"
    }
  ]
}

판단 기준:
- danger (위험): 명백한 피싱/스캠 징후 (가짜 로그인 페이지, 금전 요구, 개인정보 요청 등)
- warning (주의): 의심스러운 요소가 있으나 확실하지 않음
- safe (안전): 스캠/피싱 징후가 발견되지 않음`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "이 이미지가 스캠/피싱인지 분석해주세요.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("분석 결과가 없습니다");
    }

    // JSON 파싱 (마크다운 코드 블록 제거)
    const jsonMatch =
      content.match(/```json\s*([\s\S]*?)\s*```/) ||
      content.match(/```\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    const result = JSON.parse(jsonString);

    return NextResponse.json(result);
  } catch (error) {
    console.error("이미지 분석 오류:", error);
    return NextResponse.json(
      { error: "이미지 분석 중 오류가 발생했습니다" },
      { status: 500 },
    );
  }
}
