"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { user, hasFamilyAccount } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white px-6 py-8">
      {/* 인사말 */}
      <h1 className="text-3xl font-bold mb-6">
        안녕하세요,{" "}
        <span className="text-[#FF8D28]">{user?.name || "User"}</span> 님!
      </h1>

      {/* 메뉴 카드 그리드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* 피싱/스캠 진단하기 - 항상 표시 */}
        <Link
          href="/diagnosis"
          className="bg-gray-100 rounded-2xl p-6 flex flex-col justify-between aspect-square hover:bg-gray-200 transition-colors"
        >
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              피싱/스캠
            </h2>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              진단하기
            </h2>
          </div>
          <Image src="/home/lens.svg" alt="진단" width={48} height={48} />
        </Link>

        {/* 공동체 바로가기 - 항상 표시 */}
        <Link
          href="/community"
          className="bg-gray-100 rounded-2xl p-6 flex flex-col justify-between aspect-square hover:bg-gray-200 transition-colors"
        >
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              공동체
            </h2>
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              바로가기
            </h2>
          </div>
          <Image src="/home/lock.svg" alt="공동체" width={48} height={48} />
        </Link>

        {/* 가족연동한 경우: 가족의 A설마? (오른쪽 아래) */}
        {hasFamilyAccount && (
          <Link
            href="/family"
            className="bg-gray-100 rounded-2xl p-6 flex flex-col justify-between aspect-square hover:bg-gray-200 transition-colors col-start-2"
          >
            <div>
              <h2 className="text-base font-bold text-gray-800">가족의</h2>
              <h2 className="text-base font-bold text-gray-800">A설마</h2>
            </div>
            <Image src="/home/home.svg" alt="가족" width={48} height={48} />
          </Link>
        )}
      </div>
    </div>
  );
}
