"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function MyPage() {
  const { user, isLoggedIn, hasFamilyAccount, familyAccounts, logout, addFamilyAccount } = useAuth();
  const [familyId, setFamilyId] = useState("");
  const [familyNickname, setFamilyNickname] = useState("");
  const [showFamilyInput, setShowFamilyInput] = useState(false);

  const handleAddFamily = async () => {
    if (familyId.trim() && familyNickname.trim()) {
      await addFamilyAccount(familyId, familyNickname);
      setFamilyId("");
      setFamilyNickname("");
      setShowFamilyInput(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100dvh-64px)] bg-gray-50">
      <div className="bg-white p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
      </div>

      <div className="flex-1 p-4">
        {/* Profile Section */}
        <section className="bg-white rounded-xl p-4 mb-4">
          <h2 className="font-semibold text-gray-900 mb-4">내 프로필</h2>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">로그인하여 더 많은 기능을 이용하세요</p>
              <Link
                href="/login"
                className="inline-block px-6 py-3 bg-[#FF8C00] hover:bg-[#E67E00] text-white font-medium rounded-xl transition-colors"
              >
                로그인하기
              </Link>
            </div>
          )}
        </section>

        {/* Family Account Section */}
        {isLoggedIn && (
          <section className="bg-white rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">가족계정</h2>
              {!showFamilyInput && (
                <button
                  onClick={() => setShowFamilyInput(true)}
                  className="text-sm text-[#FF8C00] font-medium"
                >
                  + 추가하기
                </button>
              )}
            </div>

            {showFamilyInput && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 또는 아이디
                  </label>
                  <input
                    type="text"
                    value={familyId}
                    onChange={(e) => setFamilyId(e.target.value)}
                    placeholder="example@email.com 또는 user123"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF8C00]"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    상대방이 가입한 이메일 또는 아이디를 정확히 입력해주세요.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    별명
                  </label>
                  <input
                    type="text"
                    value={familyNickname}
                    onChange={(e) => setFamilyNickname(e.target.value)}
                    placeholder="예: 엄마, 아빠, 할머니"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF8C00]"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    가족 목록에서 표시될 별명을 입력해주세요.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddFamily}
                    className="flex-1 py-2 bg-[#FF8C00] text-white text-sm font-medium rounded-lg"
                  >
                    등록
                  </button>
                  <button
                    onClick={() => {
                      setShowFamilyInput(false);
                      setFamilyId("");
                      setFamilyNickname("");
                    }}
                    className="flex-1 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

            {hasFamilyAccount ? (
              <div className="space-y-3">
                {familyAccounts.map((family) => (
                  <div
                    key={family.id}
                    className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span>👨‍👩‍👧</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{family.nickname}</p>
                      <p className="text-xs text-gray-500">{family.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">
                <FamilyIcon />
                <p className="mt-2 text-sm">등록된 가족계정이 없습니다</p>
                <p className="text-xs text-gray-400 mt-1">
                  가족의 진단 결과를 확인할 수 있어요
                </p>
              </div>
            )}
          </section>
        )}

        {/* Settings Section */}
        <section className="bg-white rounded-xl overflow-hidden">
          <MenuItem icon="🔔" label="알림 설정" />
          <MenuItem icon="📋" label="이용약관" />
          <MenuItem icon="🔒" label="개인정보처리방침" />
          <MenuItem icon="❓" label="자주 묻는 질문" />
          <MenuItem icon="📞" label="문의하기" />
        </section>

        {/* Logout Button */}
        {isLoggedIn && (
          <button
            onClick={logout}
            className="w-full mt-4 py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            로그아웃
          </button>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          버전 1.0.0 | TEAM 꾸무꾸
        </p>
      </div>
    </div>
  );
}

function MenuItem({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <span>{icon}</span>
      <span className="flex-1 text-left text-gray-700">{label}</span>
      <ChevronRightIcon />
    </button>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
