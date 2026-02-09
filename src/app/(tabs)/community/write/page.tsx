"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [shareResult, setShareResult] = useState(true);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    // localStorage에서 기존 게시글 불러오기
    const existingPosts = JSON.parse(
      localStorage.getItem("community_posts") || "[]"
    );

    // 새 게시글 생성
    const newPost = {
      id: Date.now().toString(),
      author: "나",
      date: "방금 전",
      title: title.trim(),
      content: content.trim(),
      likes: 0,
      comments: 0,
      tags: [],
      shareResult,
      createdAt: new Date().toISOString(),
    };

    // 새 게시글을 맨 앞에 추가하고 저장
    localStorage.setItem(
      "community_posts",
      JSON.stringify([newPost, ...existingPosts])
    );

    router.push("/community");
  };

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center text-gray-600"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">글 작성하기</h1>
        <p className="text-sm text-gray-500 mb-6">
          A설마 사용자들에게 공유할 글을 작성해 주세요.
        </p>

        {/* Title Input */}
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요."
            className="w-full px-4 py-3 border-2 border-[#FF8C00] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E67E00]"
          />
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요."
            rows={6}
            className="w-full px-4 py-3 border-2 border-[#FF8C00] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E67E00] resize-none"
          />
        </div>

        {/* Share Result Checkbox */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <span className="text-sm text-gray-700">진단결과 공유하기</span>
          <button
            onClick={() => setShareResult(!shareResult)}
            className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
              shareResult ? "bg-[#FF8C00]" : "bg-gray-200"
            }`}
          >
            {shareResult && <CheckIcon />}
          </button>
        </div>

        {/* Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-medium">알림:</span> 클린봇이 동작중이에요.
            A설마는 청결한 공동체를 유지하기 위해 노력 중이에요.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-6 pt-0">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
        >
          게시하기
        </button>
      </div>
    </div>
  );
}

function ChevronLeftIcon() {
  return (
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
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
