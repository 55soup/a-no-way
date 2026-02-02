"use client";

import Link from "next/link";

// Mock history data
const mockHistory = [
  {
    id: "1",
    type: "image",
    date: "2024.01.15 14:32",
    status: "danger",
    preview: "쿠팡 체험단 관련 이미지",
  },
  {
    id: "2",
    type: "text",
    date: "2024.01.14 09:15",
    status: "safe",
    preview: "택배 배송 안내 문자",
  },
  {
    id: "3",
    type: "text",
    date: "2024.01.13 18:42",
    status: "warning",
    preview: "금융기관 사칭 문자",
  },
];

const statusConfig = {
  danger: { label: "위험", color: "bg-red-100 text-red-600" },
  warning: { label: "주의", color: "bg-yellow-100 text-yellow-600" },
  safe: { label: "안전", color: "bg-green-100 text-green-600" },
};

export default function DiagnosisHistoryPage() {
  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Link href="/diagnosis" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg">
            <BackIcon />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">진단 기록</h1>
            <p className="text-sm text-gray-500">이전 진단 결과를 확인하세요</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        {mockHistory.length > 0 ? (
          <div className="flex flex-col gap-3">
            {mockHistory.map((item) => {
              const status = statusConfig[item.status as keyof typeof statusConfig];
              return (
                <Link
                  key={item.id}
                  href={`/diagnosis/result?type=${item.type}&status=${item.status}`}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#FF8C00] transition-all"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {item.type === "image" ? <ImageIcon /> : <TextIcon />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.preview}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <EmptyIcon />
            <p className="mt-4">진단 기록이 없습니다</p>
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

function ImageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
