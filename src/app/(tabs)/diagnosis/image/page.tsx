"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ImageDiagnosisPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      if (!response.ok) {
        throw new Error("분석 요청에 실패했습니다");
      }

      const result = await response.json();

      // 결과를 sessionStorage에 저장하고 결과 페이지로 이동
      sessionStorage.setItem("diagnosisResult", JSON.stringify(result));
      sessionStorage.setItem("diagnosisType", "image");
      sessionStorage.setItem("diagnosisImage", selectedImage);
      router.push("/diagnosis/result");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "분석 중 오류가 발생했습니다",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white">
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <Image
            src="/logo.png"
            alt="A설마? 로고"
            width={200}
            height={100}
            priority
          />
          <LoadingSpinner className="w-8 h-8" />
          <p className="text-gray-500 text-sm">
            A설마가 똑똑하게 진단 중이에요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link
            href="/diagnosis"
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg"
          >
            <BackIcon />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">이미지 검사</h1>
            <p className="text-sm text-gray-500">
              의심 이미지를 업로드해 주세요
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!selectedImage ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-4 py-16 px-8 border-2 border-dashed border-[#FF8C00] rounded-2xl hover:bg-orange-50 transition-all"
            >
              <Image src="/download.svg" alt="업로드" width={61} height={61} />
              <div className="text-center">
                <p className="text-gray-500">분석할 파일을</p>
                <p className="text-gray-500">업로드 해주세요.</p>
              </div>
            </button>

            <div className="gap-1 text-sm bg-gray-100 rounded-xl p-3">
              <span className="text-[#FF8C00]">💡 업로드 Tip: </span>
              <span className="text-gray-600">
                진단할 내용을 전부 확인할 수 있도록 내용 전체가 보이면 좋아요.
                전부가 안 보여도 괜찮아요. A설마는 똑똑하니까요!
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={selectedImage}
                alt="선택된 이미지"
                className="w-full h-auto max-h-[300px] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4 bg-[#FF8C00] hover:bg-[#E67E00] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
            >
              {isAnalyzing ? "AI가 분석 중..." : "분석 요청하기"}
            </button>
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

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
