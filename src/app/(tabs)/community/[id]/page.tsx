"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Mock community posts (shared data)
const mockPosts = [
  {
    id: "1",
    author: "김안전",
    date: "2026.01.15",
    title: "쿠팡 체험단 사기 조심하세요!",
    content:
      "오늘 쿠팡 체험단이라며 전화가 왔는데 A설마?로 검사해보니 위험이라고 나왔어요. 다들 조심하세요!\n\n전화로 체험단에 선정되었다며 개인정보를 요구하더라구요. 이상해서 바로 끊고 검사해봤더니 역시나 피싱이었습니다.",
    likes: 24,
    comments: 5,
    tags: ["사기", "쿠팡", "체험단"],
    diagnosisResult: {
      type: "피싱",
      description:
        "택배 실패를 가장한 사칭 문자예요. 링크를 클릭하면 즉시 계좌이체가 되며, 돈이 털려요!",
      responses: [
        "무시하세요.",
        "전화번호 차단하세요.",
        "링크를 절대 클릭하지 마세요",
      ],
      similarCases: ["카카오톡으로 친구 사칭", "택배 배송 실패 문자"],
    },
  },
  {
    id: "2",
    author: "이조심",
    date: "2026.01.14",
    title: "국민은행 사칭 문자 패턴 공유",
    content:
      "최근 국민은행을 사칭한 문자들의 공통점을 정리해봤습니다.\n\nURL에 'kb' 대신 'kbbanking' 같은 변형된 주소를 사용하고, 긴급하게 비밀번호 변경을 요구합니다. 공식 앱이나 고객센터를 통해서만 접속하세요!",
    likes: 45,
    comments: 12,
    tags: ["금융", "은행", "패턴"],
    diagnosisResult: {
      type: "스미싱",
      description:
        "국민은행을 사칭한 금융 사기 문자예요. 링크를 통해 가짜 사이트로 유도합니다.",
      responses: [
        "문자 내 링크를 절대 클릭하지 마세요.",
        "공식 앱을 통해서만 접속하세요.",
        "의심되면 고객센터(1588-9999)로 문의하세요.",
      ],
      similarCases: ["신한은행 사칭", "카드사 한도 증액 문자"],
    },
  },
  {
    id: "3",
    author: "박방패",
    date: "2026.01.13",
    title: "부모님께 A설마? 알려드리세요",
    content:
      "어르신들이 피싱에 취약하시잖아요. 저도 부모님 폰에 설치해드리고 사용법 알려드렸더니 좋아하세요!\n\n특히 문자 오면 바로 검사할 수 있어서 편하다고 하시더라구요. 가족들에게도 꼭 알려주세요!",
    likes: 89,
    comments: 23,
    tags: ["가족", "어르신", "공유"],
    diagnosisResult: null,
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
  diagnosisResult: {
    type: string;
    description: string;
    responses: string[];
    similarCases: string[];
  } | null;
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [showDiagnosis, setShowDiagnosis] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const postId = params.id as string;

    // localStorage에서 사용자 게시글 확인
    const savedPosts = localStorage.getItem("community_posts");
    let allPosts = [...mockPosts];

    if (savedPosts) {
      const userPosts = JSON.parse(savedPosts) as Post[];
      allPosts = [...userPosts, ...mockPosts];
    }

    const foundPost = allPosts.find((p) => p.id === postId);
    setPost(foundPost || null);
  }, [params.id]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50 items-center justify-center">
        <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
        <Link
          href="/community"
          className="mt-4 text-[#FF8C00] font-medium"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <BackIcon />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 line-clamp-1">
          {post.title}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white p-4">
          {/* Author info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">{post.author}</span>
              <p className="text-xs text-gray-400">{post.date}</p>
            </div>
          </div>

          {/* Post content */}
          <div className="mb-4">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Diagnosis Result Toggle */}
          {post.diagnosisResult && (
            <button
              onClick={() => setShowDiagnosis(!showDiagnosis)}
              className="w-full py-3 text-center text-sm text-gray-500 border-t border-gray-100"
            >
              {showDiagnosis ? "▲ 공유된 진단결과 닫기" : "▼ 공유된 진단결과 보기"}
            </button>
          )}
        </div>

        {/* Diagnosis Result Section */}
        {post.diagnosisResult && showDiagnosis && (
          <div className="mt-2">
            {/* Danger Alert */}
            <div className="mx-4 bg-red-50 border border-red-200 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-500 font-bold text-sm">⚠️ 진단 결과</span>
              </div>
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                  {post.diagnosisResult.type}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {post.diagnosisResult.description}
              </p>
            </div>

            {/* Response Methods */}
            <div className="mx-4 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3">
              <h3 className="font-bold text-blue-800 text-sm mb-3">💡 대응방법</h3>
              <ul className="space-y-2">
                {post.diagnosisResult.responses.map((response, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-500">•</span>
                    {response}
                  </li>
                ))}
              </ul>
            </div>

            {/* Similar Cases */}
            <div className="mx-4 bg-gray-50 border border-gray-200 rounded-xl p-4 mb-3">
              <h3 className="font-bold text-gray-700 text-sm mb-3">🔍 비슷한 수법</h3>
              <ul className="space-y-2">
                {post.diagnosisResult.similarCases.map((caseItem, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-gray-400">•</span>
                    {caseItem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white p-4 mt-2 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 transition-colors ${
                liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              }`}
            >
              <HeartIcon filled={liked} />
              <span className="text-sm">{liked ? post.likes + 1 : post.likes}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <CommentIcon />
              <span className="text-sm">{post.comments}</span>
            </div>
          </div>
        </div>

        {/* Comments section placeholder */}
        <div className="bg-white p-4 mt-2">
          <h3 className="font-bold text-gray-900 mb-4">댓글 {post.comments}개</h3>
          <div className="text-center py-8 text-gray-400 text-sm">
            댓글 기능은 준비 중입니다.
          </div>
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
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
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
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
      width="20"
      height="20"
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
