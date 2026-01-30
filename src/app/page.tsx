"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-dvh bg-white">
      <Image
        src="/logo.png"
        alt="A얼마? 로고"
        width={200}
        height={100}
        priority
        className="animate-pulse"
      />
    </div>
  );
}
