"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

const loadingMessages = [
  "최근 쿠팡 체험단 사기 전화가 늘었어요. 😓\n의심되면 바로 A설마?에 검증하세요!",
  "의심되면 무조건 A설마에서 검증하세요.",
  "A설마 피싱/스캠 진단결과를 가족에게 공유할 수 있어요.",
];

export default function TextDiagnosisPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("분석 요청에 실패했습니다");
      }

      const result = await response.json();

      // 결과를 sessionStorage에 저장하고 결과 페이지로 이동
      sessionStorage.setItem("diagnosisResult", JSON.stringify(result));
      sessionStorage.setItem("diagnosisType", "text");
      router.push("/diagnosis/result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "분석 중 오류가 발생했습니다");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-between min-h-[calc(100dvh-64px)] bg-white py-12">
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <Image
            src="/logo.png"
            alt="A설마? 로고"
            width={200}
            height={100}
            priority
          />
          <LoadingSpinner className="w-8 h-8" />
        </div>

        <div className="flex flex-col items-center gap-6 px-6">
          <p
            key={messageIndex}
            className="text-sm text-gray-700 leading-relaxed whitespace-pre-line text-center min-h-[48px] animate-slide-fade-in"
          >
            {loadingMessages[messageIndex]}
          </p>
        </div>
      </div>
    );
  }

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

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-4 text-center">
            입력하신 내용은 AI가 분석하여 피싱/스캠 여부를 판단합니다
          </p>
          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className="w-full py-4 bg-[#FF8C00] hover:bg-[#E67E00] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
          >
            {isAnalyzing ? "AI가 분석 중..." : "분석 요청하기"}
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
