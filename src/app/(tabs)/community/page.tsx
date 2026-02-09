"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

// Mock community posts
const mockPosts = [
  {
    id: "1",
    author: "김안전",
    date: "10분 전",
    title: "쿠팡 체험단 사기 조심하세요!",
    content:
      "오늘 쿠팡 체험단이라며 전화가 왔는데 A설마?로 검사해보니 위험이라고 나왔어요. 다들 조심하세요!",
    likes: 24,
    comments: 5,
    tags: ["사기", "쿠팡", "체험단"],
  },
  {
    id: "2",
    author: "이조심",
    date: "1시간 전",
    title: "국민은행 사칭 문자 패턴 공유",
    content:
      "최근 국민은행을 사칭한 문자들의 공통점을 정리해봤습니다. URL에 'kb' 대신 'kbbanking' 같은...",
    likes: 45,
    comments: 12,
    tags: ["금융", "은행", "패턴"],
  },
  {
    id: "3",
    author: "박방패",
    date: "3시간 전",
    title: "부모님께 A설마? 알려드리세요",
    content:
      "어르신들이 피싱에 취약하시잖아요. 저도 부모님 폰에 설치해드리고 사용법 알려드렸더니 좋아하세요!",
    likes: 89,
    comments: 23,
    tags: ["가족", "어르신", "공유"],
  },
];

type Post = {
  id: string;
  author: string;
  date: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
};

export default function CommunityPage() {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  useEffect(() => {
    // localStorage에서 사용자 게시글 불러오기
    const savedPosts = localStorage.getItem("community_posts");
    if (savedPosts) {
      const userPosts = JSON.parse(savedPosts) as Post[];
      setPosts([...userPosts, ...mockPosts]);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50">
      <div className="bg-white p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">공동체</h1>
        <p className="text-sm text-gray-500">함께 피싱/스캠 정보를 공유해요</p>
      </div>

      <div className="bg-white border-b border-gray-100">
        <div className="flex px-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "all"
                ? "border-[#FF8C00] text-[#FF8C00]"
                : "border-transparent text-gray-500"
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveTab("popular")}
            className={`py-3 px-4 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "popular"
                ? "border-[#FF8C00] text-[#FF8C00]"
                : "border-transparent text-gray-500"
            }`}
          >
            인기
          </button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <span className="font-medium text-gray-900 text-sm">
                  {post.author}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {post.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <button className="flex items-center gap-1 hover:text-[#FF8C00] transition-colors">
                  <HeartIcon />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-[#FF8C00] transition-colors">
                  <CommentIcon />
                  <span>{post.comments}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isLoggedIn && (
        <Link
          href="/community/write"
          className="fixed bottom-20 right-4 w-14 h-14 bg-[#FF8C00] hover:bg-[#E67E00] text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <PlusIcon />
        </Link>
      )}

      {!isLoggedIn && (
        <div className="fixed bottom-20 left-0 right-0 p-4 max-w-[430px] mx-auto">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              로그인하고 글을 작성해보세요
            </p>
            <Link
              href="/login"
              className="px-4 py-2 bg-[#FF8C00] text-white text-sm font-medium rounded-lg"
            >
              로그인
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PlusIcon() {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
