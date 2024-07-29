import { BuddyProfileProps } from '@/types/ProfileParams.types';
import Image from 'next/image';
import React from 'react';

function EditProfilePage({ id }: BuddyProfileProps) {
    return (
        <div className="flex flex-col items-center p-4min-h-screen">
            <div className="w-full max-w-lg rounded-lg p-6">
                <div className="flex flex-col items-center mt-6">
                    <div className="relative">
                        <Image
                            src="/buddy_mascot.webp"
                            alt="Profile"
                            width={100}
                            height={100}
                            className="w-[100px] h-[100px] xl:w-[200px] xl:h-[200px] rounded-full object-cover"
                        />
                        {/* 프로필 사진 변경 버튼 */}
                        <button className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full border-4 border-white">
                            <svg
                                className="w-4 h-4 xl:w-6 xl:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <button className="mt-2">프로필 사진 삭제</button>
                    <p className="mt-2 text-gray-500">
                        카카오 로그인 상태입니다
                    </p>
                </div>
                <div className="mt-6">
                    <table className="w-full">
                        <tbody>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">이름</td>
                                <td className="w-4/5">김버디</td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">성별</td>
                                <td className="w-4/5">여성</td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">
                                    출생년도
                                </td>
                                <td className="w-4/5">1997</td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">소개</td>
                                <td className="w-4/5">
                                    맛집, 예쁜 카페 탐방 좋아해요~!
                                </td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">MBTI</td>
                                <td className="w-4/5">ENFP</td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">거주지</td>
                                <td className="w-4/5">경기도 수원</td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">
                                    선호 여정
                                </td>
                                <td className="w-1/2 text-blue-500 text-right">
                                    &gt;
                                </td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">
                                    버디즈 성향
                                </td>
                                <td className="w-1/2 text-blue-500 text-right">
                                    &gt;
                                </td>
                            </tr>
                            <tr className="flex justify-between py-2">
                                <td className="w-1/2 text-gray-600">
                                    비밀번호 변경
                                </td>
                                <td className="w-1/2 text-blue-500 text-right">
                                    &gt;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EditProfilePage;
