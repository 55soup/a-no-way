import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "텍스트가 필요합니다" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `당신은 스캠/피싱 문자를 분석하는 전문가입니다.
사용자가 제공한 문자 메시지를 분석하여 스캠/피싱 여부를 판단하고, 아래 JSON 형식으로만 응답하세요.

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
- danger (위험): 명백한 피싱/스캠 징후 (금전 요구, 긴급 상황 가장, 개인정보/계좌정보 요청, 의심스러운 링크 등)
- warning (주의): 의심스러운 요소가 있으나 확실하지 않음
- safe (안전): 스캠/피싱 징후가 발견되지 않음

주요 스캠 유형:
- 보이스피싱 (가족 사칭, 기관 사칭)
- 스미싱 (택배, 청첩장, 부고 문자)
- 로맨스 스캠
- 투자 사기
- 대출 사기`,
        },
        {
          role: "user",
          content: `다음 문자 메시지가 스캠/피싱인지 분석해주세요:\n\n${text}`,
        },
      ],
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("분석 결과가 없습니다");
    }

    // JSON 파싱 (마크다운 코드 블록 제거)
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) ||
                      content.match(/```\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;
    const result = JSON.parse(jsonString);

    return NextResponse.json(result);
  } catch (error) {
    console.error("텍스트 분석 오류:", error);
    return NextResponse.json(
      { error: "텍스트 분석 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
