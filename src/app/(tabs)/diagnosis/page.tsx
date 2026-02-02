"use client";

import Link from "next/link";

export default function DiagnosisPage() {
  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white px-6 py-8">
      {/* 타이틀 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">진단하기</h1>

      {/* 진단 카드들 */}
      <div className="flex flex-col gap-4 mb-8">
        {/* 의심이미지 검사하기 */}
        <Link
          href="/diagnosis/image"
          className="bg-gray-100 rounded-2xl p-6 min-h-[240px] flex flex-col justify-between hover:bg-gray-200 transition-colors"
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800">의심이미지</h2>
            <h2 className="text-xl font-bold text-gray-800">검사하기</h2>
          </div>
          <div className="flex justify-end">
            <div className="text-6xl">🔒</div>
          </div>
        </Link>

        {/* 의심 문자 검사하기 */}
        <Link
          href="/diagnosis/text"
          className="bg-gray-100 rounded-2xl p-6 min-h-[240px] flex flex-col justify-between hover:bg-gray-200 transition-colors"
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800">의심 문자</h2>
            <h2 className="text-xl font-bold text-gray-800">검사하기</h2>
          </div>
          <div className="flex justify-end">
            <div className="text-6xl">🔍</div>
          </div>
        </Link>
      </div>

      {/* 진단 기록 보기 */}
      <Link
        href="/diagnosis/history"
        className="bg-gray-100 rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-gray-200 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-800">진단 기록 보기</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </div>
  );
}