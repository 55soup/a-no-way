"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FeedbackForm from "@/components/FeedbackForm";

interface DiagnosisResult {
  status: "danger" | "warning" | "safe";
  riskLevel: number;
  diagnosis: {
    title: string;
    summary: string;
    details: string[];
  };
  response: {
    immediate: string[];
    preventive: string[];
  };
  similarScams: {
    name: string;
    description: string;
  }[];
}

const statusConfig = {
  danger: {
    label: "위험",
    emoji: "🚨",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    progressColor: "bg-red-500",
  },
  warning: {
    label: "주의",
    emoji: "⚠️",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    progressColor: "bg-yellow-500",
  },
  safe: {
    label: "안전",
    emoji: "✅",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    progressColor: "bg-green-500",
  },
};

export default function DiagnosisResultPage() {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);

  const [result] = useState<DiagnosisResult | null>(() => {
    if (typeof window !== "undefined") {
      const storedResult = sessionStorage.getItem("diagnosisResult");
      return storedResult ? JSON.parse(storedResult) : null;
    }
    return null;
  });

  const [diagnosisType] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("diagnosisType") || "text";
    }
    return "text";
  });

  const [diagnosisImage] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("diagnosisImage") || null;
    }
    return null;
  });

  const [currentDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${now.getHours() >= 12 ? "오후" : "오전"} ${now.getHours() % 12 || 12}시 ${now.getMinutes()}분`;
  });

  useEffect(() => {
    if (!result) {
      router.push("/diagnosis");
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-64px)]">
        <div className="animate-spin rounded-full w-8 h-8 border-4 border-gray-200 border-t-[#FF8C00]" />
      </div>
    );
  }

  const config = statusConfig[result.status];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link
            href="/diagnosis"
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
          >
            <BackIcon />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">진단결과</h1>
            <p className="text-sm text-gray-500">
              A설마가 똑똑하게 진단했어요.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">{currentDate}</p>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto pb-24">
        {/* 검사한 이미지 썸네일 */}
        {diagnosisType === "image" && diagnosisImage && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="rounded-xl overflow-hidden bg-gray-100">
              <img
                src={diagnosisImage}
                alt="검사한 이미지"
                className="w-full h-auto max-h-[200px] object-contain"
              />
            </div>
          </div>
        )}

        {/* 진단 결과 카드 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-4 py-2 bg-[#FF383C] text-white font-bold rounded-full text-base">
            ⚠️ 진단 결과
          </span>
        </div>
        <div
          className={`p-5 rounded-2xl ${config.bgColor} border ${config.borderColor}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bgColor} ${config.color} border ${config.borderColor}`}
            >
              {config.emoji} {config.label}
            </span>
            <span className="text-sm text-gray-500">
              위험도 {result.riskLevel}%
            </span>
          </div>

          {/* 위험도 바 */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div
              className={`h-full rounded-full ${config.progressColor} transition-all`}
              style={{ width: `${result.riskLevel}%` }}
            />
          </div>

          <h2 className={`text-lg font-bold ${config.color} mb-2`}>
            {result.diagnosis.title}
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            {result.diagnosis.summary}
          </p>

          <div className="space-y-2">
            {result.diagnosis.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="text-gray-400">•</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 대응방법 */}

        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-4 py-2 bg-[#0088FF] text-white font-bold rounded-full text-base">
            ☝️ 대응방법
          </span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          {result.response.immediate.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">즉시 대응</p>
              <div className="space-y-2">
                {result.response.immediate.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-cyan-500">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.response.preventive.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">예방</p>
              <div className="space-y-2">
                {result.response.preventive.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-cyan-500">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 비슷한 수법 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-4 py-2 bg-[#6155F5] text-white font-bold rounded-full text-base">
            🤔 비슷한 수법
          </span>
        </div>
        {result.similarScams.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className="space-y-3">
              {result.similarScams.map((scam, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800 text-sm">
                    {scam.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {scam.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 공유하기 버튼 */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="text-sm text-gray-600 mb-3 text-center">
            이 정보를 가족이나 지인에게 공유해주세요
          </p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-[#FF8C00] text-white font-semibold rounded-xl hover:bg-[#E67E00] transition-colors">
              가족에게 공유하기
            </button>
            <button className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              공동체에 공유하기
            </button>
          </div>
        </div>

        {/* 피드백 */}
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="w-full py-3 text-[#FF8C00] font-medium border border-[#FF8C00] rounded-xl hover:bg-orange-50 transition-colors bg-white"
        >
          {showFeedback ? "피드백 접기" : "진단 결과가 틀렸나요? 피드백 보내기"}
        </button>

        {showFeedback && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100">
            <FeedbackForm />
          </div>
        )}
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
