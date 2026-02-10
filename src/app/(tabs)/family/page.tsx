"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function FamilyPage() {
  const { familyAccounts, hasFamilyAccount } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50">
      <div className="bg-white p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/home" className="text-gray-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">가족 계정</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        {hasFamilyAccount ? (
          <div className="space-y-3">
            {familyAccounts.map((family) => (
              <Link
                key={family.id}
                href={`/family/${encodeURIComponent(family.id)}`}
                className="bg-white rounded-xl p-4 flex items-center gap-4 block"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍👩‍👧</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{family.nickname}</p>
                  <p className="text-sm text-gray-500">{family.id}</p>
                </div>
                <div className="text-[#FF8C00]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="text-gray-500 mb-2">등록된 가족 계정이 없습니다</p>
            <p className="text-sm text-gray-400 mb-4">
              마이페이지에서 가족을 추가해보세요
            </p>
            <Link
              href="/mypage"
              className="px-6 py-3 bg-[#FF8C00] text-white font-medium rounded-xl"
            >
              가족 추가하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
