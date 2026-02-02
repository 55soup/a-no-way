"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [correctResult, setCorrectResult] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit - 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
        <span className="text-2xl">🙏</span>
        <p className="font-medium text-green-700 mt-2">피드백 감사합니다!</p>
        <p className="text-sm text-green-600 mt-1">
          더 나은 서비스를 위해 활용하겠습니다
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3">진단 결과가 틀렸나요?</h3>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setCorrectResult("safe")}
          className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${
            correctResult === "safe"
              ? "bg-green-100 border-green-300 text-green-700"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          실제로 안전
        </button>
        <button
          type="button"
          onClick={() => setCorrectResult("danger")}
          className={`flex-1 py-2 px-3 text-sm rounded-lg border transition-colors ${
            correctResult === "danger"
              ? "bg-red-100 border-red-300 text-red-700"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          실제로 위험
        </button>
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="추가 의견이 있다면 적어주세요 (선택)"
        className="w-full p-3 border border-gray-200 rounded-lg resize-none text-sm focus:outline-none focus:border-[#FF8C00]"
        rows={3}
      />

      <button
        type="submit"
        disabled={!correctResult}
        className="w-full mt-3 py-3 bg-[#FF8C00] hover:bg-[#E67E00] disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors"
      >
        피드백 제출
      </button>
    </form>
  );
}
