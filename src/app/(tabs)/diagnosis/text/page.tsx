"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TextDiagnosisPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    // Mock analysis - 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsAnalyzing(false);

    // Navigate to result page with mock result
    router.push("/diagnosis/result?type=text&status=warning");
  };

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/diagnosis" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <BackIcon />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">문자 검사</h1>
            <p className="text-sm text-gray-500">의심 문자 내용을 입력해 주세요</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="의심되는 문자나 메시지 내용을 붙여넣기 하거나 직접 입력해 주세요."
            className="w-full h-full min-h-[200px] p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-[#FF8C00] focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-4 text-center">
            입력하신 내용은 AI가 분석하여 피싱/스캠 여부를 판단합니다
          </p>
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className="w-full py-4 bg-[#FF8C00] hover:bg-[#E67E00] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
          >
            {isAnalyzing ? "분석 중..." : "분석 요청하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
