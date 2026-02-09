"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const messages = [
  "최근 쿠팡 체험단 사기 전화가 늘었어요. 😓\n의심되면 바로 A설마?에 검증하세요!",
  "의심되면 무조건 A설마에서 검증하세요.",
  "A설마 피싱/스캠 진단결과를 가족에게 공유할 수 있어요.",
];

export default function SplashPage() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-dvh bg-white py-12">
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
          {messages[messageIndex]}
        </p>

        <p className="text-xs text-gray-400">TEAM 꾸무꾸</p>
      </div>
    </div>
  );
}
