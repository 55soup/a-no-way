"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FeedbackForm from "@/components/FeedbackForm";

const statusConfig = {
  danger: {
    label: "위험",
    emoji: "🚨",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    message: "이 내용은 피싱/스캠일 가능성이 매우 높습니다!",
    description: "절대 개인정보를 입력하거나 링크를 클릭하지 마세요. 금전 요구에 응하지 마세요.",
  },
  warning: {
    label: "주의",
    emoji: "⚠️",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    message: "이 내용은 주의가 필요합니다.",
    description: "일부 의심스러운 패턴이 발견되었습니다. 출처를 확인하고 신중하게 대응하세요.",
  },
  safe: {
    label: "안전",
    emoji: "✅",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    message: "이 내용은 안전해 보입니다.",
    description: "현재로서는 피싱/스캠 징후가 발견되지 않았습니다. 그래도 항상 주의하세요.",
  },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const [showFeedback, setShowFeedback] = useState(false);

  const status = (searchParams.get("status") as keyof typeof statusConfig) || "safe";
  const type = searchParams.get("type") || "text";
  const config = statusConfig[status];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/diagnosis" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <BackIcon />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">진단 결과</h1>
            <p className="text-sm text-gray-500">
              {type === "image" ? "이미지" : "문자"} 분석 결과
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className={`p-6 rounded-2xl ${config.bgColor} border ${config.borderColor} mb-6`}>
          <div className="text-center">
            <span className="text-5xl">{config.emoji}</span>
            <h2 className={`text-2xl font-bold ${config.color} mt-4`}>{config.label}</h2>
            <p className={`font-medium ${config.color} mt-2`}>{config.message}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">상세 설명</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{config.description}</p>
        </div>

        {status === "danger" && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
              <WarningIcon />
              대응 방법
            </h3>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• 해당 번호를 차단하세요</li>
              <li>• 경찰청 사이버범죄신고센터(182)에 신고하세요</li>
              <li>• 금융감독원(1332)에 상담하세요</li>
            </ul>
          </div>
        )}

        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="w-full py-3 text-[#FF8C00] font-medium border border-[#FF8C00] rounded-xl hover:bg-orange-50 transition-colors"
        >
          {showFeedback ? "피드백 접기" : "피드백 보내기"}
        </button>

        {showFeedback && (
          <div className="mt-4">
            <FeedbackForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiagnosisResultPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResultContent />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-64px)]">
      <div className="animate-spin rounded-full w-8 h-8 border-4 border-gray-200 border-t-[#FF8C00]" />
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

function WarningIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
