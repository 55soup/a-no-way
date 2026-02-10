"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useParams } from "next/navigation";

// 진단 결과 타입
type DiagnosisStatus = "danger" | "warning" | "safe";

interface DiagnosisRecord {
  id: string;
  title: string;
  date: string;
  status: DiagnosisStatus;
}

// 목 데이터 - 실제로는 API에서 가져올 데이터
const mockDiagnosisRecords: DiagnosisRecord[] = [
  {
    id: "1",
    title: "쿠팡 체험단 관련 이미지",
    date: "2024.01.15 14:32",
    status: "danger",
  },
  {
    id: "2",
    title: "택배 배송 안내 문자",
    date: "2024.01.14 09:15",
    status: "safe",
  },
  {
    id: "3",
    title: "금융기관 사칭 문자",
    date: "2024.01.13 18:42",
    status: "warning",
  },
  {
    id: "4",
    title: "쿠팡 체험단 관련 이미지",
    date: "2024.01.12 14:32",
    status: "danger",
  },
  {
    id: "5",
    title: "카드사 정상 안내",
    date: "2024.01.11 16:20",
    status: "safe",
  },
  {
    id: "6",
    title: "배송 완료 알림",
    date: "2024.01.10 11:05",
    status: "safe",
  },
];

const statusConfig = {
  danger: { label: "위험", bgColor: "bg-red-50", textColor: "text-red-500" },
  warning: {
    label: "주의",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  safe: { label: "안전", bgColor: "bg-green-50", textColor: "text-green-500" },
};

export default function FamilyDetailPage() {
  const params = useParams();
  const familyId = decodeURIComponent(params.familyId as string);
  const { familyAccounts } = useAuth();

  const familyMember = familyAccounts.find((f) => f.id === familyId);

  // 통계 계산
  const stats = {
    danger: mockDiagnosisRecords.filter((r) => r.status === "danger").length,
    warning: mockDiagnosisRecords.filter((r) => r.status === "warning").length,
    safe: mockDiagnosisRecords.filter((r) => r.status === "safe").length,
  };

  if (!familyMember) {
    return (
      <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50 items-center justify-center">
        <p className="text-gray-500">가족 정보를 찾을 수 없습니다</p>
        <Link href="/family" className="mt-4 text-[#FF8C00]">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/family" className="text-gray-500">
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
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">
          가족정보 - {familyMember.nickname}
        </h1>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-xl p-5">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {familyMember.nickname}
              </p>
              <p className="text-sm text-gray-400">{familyMember.id}</p>
            </div>
          </div>
          <br />
          {/* 통계 카드들 */}
          <div className="flex gap-3">
            {/* 위험 */}
            <div className="flex-1 bg-red-50 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mb-1">위험</p>
              <p className="text-xl font-bold text-red-500">{stats.danger}건</p>
            </div>

            {/* 주의 */}
            <div className="flex-1 bg-yellow-50 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EAB308"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mb-1">주의</p>
              <p className="text-xl font-bold text-yellow-500">
                {stats.warning}건
              </p>
            </div>

            {/* 안전 */}
            <div className="flex-1 bg-green-50 rounded-xl p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 12 15 16 10" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 mb-1">안전</p>
              <p className="text-xl font-bold text-green-500">{stats.safe}건</p>
            </div>
          </div>
        </div>

        {/* 진단 기록 */}
        <div className="bg-white rounded-xl p-5">
          <h2 className="font-semibold text-gray-900 mb-4">진단 기록</h2>
          <div className="space-y-3">
            {mockDiagnosisRecords.map((record) => {
              const config = statusConfig[record.status];
              return (
                <div
                  key={record.id}
                  className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
                >
                  {/* 메시지 아이콘 */}
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {record.title}
                    </p>
                    <p className="text-sm text-gray-400">{record.date}</p>
                  </div>

                  {/* 상태 배지 */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
                  >
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
