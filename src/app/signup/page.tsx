"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup, socialLogin } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);
    const success = await signup(email, password, name);
    setIsLoading(false);

    if (success) {
      router.push("/home");
    } else {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSocialLogin = async (provider: "kakao" | "naver" | "google") => {
    setIsLoading(true);
    const success = await socialLogin(provider);
    setIsLoading(false);

    if (success) {
      router.push("/home");
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="p-4">
        <Link href="/login" className="p-2 -ml-2 inline-block hover:bg-gray-100 rounded-lg">
          <BackIcon />
        </Link>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <Image
            src="/logo.png"
            alt="A얼마? 로고"
            width={100}
            height={50}
            className="mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="text-gray-500 mt-1">A얼마?와 함께해요</p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleSocialLogin("kakao")}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#FEE500] hover:bg-[#E6CF00] text-[#191919] font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <KakaoIcon />
            카카오로 시작하기
          </button>
          <button
            onClick={() => handleSocialLogin("naver")}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#03C75A] hover:bg-[#02B351] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <NaverIcon />
            네이버로 시작하기
          </button>
          <button
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2 border border-gray-200 transition-colors"
          >
            <GoogleIcon />
            Google로 시작하기
          </button>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">또는 이메일로 가입</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8C00] focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8C00] focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상 입력하세요"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8C00] focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8C00] focus:ring-2 focus:ring-orange-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#FF8C00] hover:bg-[#E67E00] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
          >
            {isLoading ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 pb-4">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[#FF8C00] font-medium">
            로그인
          </Link>
        </p>
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

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#191919">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.9 5.31 4.75 6.72l-.97 3.6c-.08.3.26.53.52.36l4.3-2.88c.46.05.92.07 1.4.07 5.52 0 10-3.58 10-8S17.52 3 12 3z" />
    </svg>
  );
}

function NaverIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M16 3H8v10.5L13.5 8H16v13H8v-8.5L2 18.5V3h6L2 8.5V3z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
