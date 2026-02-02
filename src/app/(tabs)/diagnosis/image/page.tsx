"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ImageDiagnosisPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    // Mock analysis - 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsAnalyzing(false);

    // Navigate to result page with mock result
    router.push("/diagnosis/result?type=image&status=danger");
  };

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/diagnosis" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <BackIcon />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">이미지 검사</h1>
            <p className="text-sm text-gray-500">의심 이미지를 업로드해 주세요</p>
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
              className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#FF8C00] hover:bg-orange-50 transition-all"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <UploadIcon />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">이미지 업로드</p>
                <p className="text-sm text-gray-500 mt-1">갤러리에서 선택하거나 촬영</p>
              </div>
            </button>
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

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4 bg-[#FF8C00] hover:bg-[#E67E00] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors"
            >
              {isAnalyzing ? "분석 중..." : "분석 요청하기"}
            </button>
          </div>
        )}
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

function UploadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
