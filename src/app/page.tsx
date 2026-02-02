"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh bg-white py-12">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <Image
          src="/logo.png"
          alt="A얼마? 로고"
          width={200}
          height={100}
          priority
        />
        <LoadingSpinner className="w-8 h-8" />
      </div>

      <div className="flex flex-col items-center gap-6 px-6">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-700 leading-relaxed">
            최근 쿠팡 체험단 사기 전화가 늘었어요. 😓
            <br />
            의심되면 바로 A얼마?에 검증하세요!
          </p>
        </div>

        <p className="text-xs text-gray-400">TEAM 꾸무꾸</p>
      </div>
    </div>
  );
}
