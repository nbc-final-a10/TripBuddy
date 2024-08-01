'use client';

import ProfileEditColumn from '@/components/atoms/profile/ProfileEditColumn';
import React, { useState } from 'react';
import Image from 'next/image';
import { Buddy } from '@/types/Auth.types';
import EditProfileSkeleton from '@/components/molecules/profile/EditProfileSkeleton';
import { getAgeFromBirthDate } from '@/utils/common/getAgeFromBirthDate';
import Link from 'next/link';

type EditProfilePageProps = {
    buddy: Buddy;
};

function EditProfilePage({ buddy }: EditProfilePageProps) {
    const [isOpen, setIsOpen] = useState({
        journey: false,
        personality: false,
        password: false,
    });

    if (!buddy) {
        return <EditProfileSkeleton />;
    }

    // Todo: 온보딩 없으면 예외 처리 하기
    if (buddy.buddy_isOnBoarding) {
        const toggleAccordion = (key: keyof typeof isOpen) => {
            setIsOpen(prev => ({
                ...prev,
                [key]: !prev[key],
            }));
        };

        return (
            <div className="flex flex-col items-center p-4 min-h-screen">
                <div className="w-full max-w-lg rounded-lg p-6">
                    <div className="flex flex-col items-center mt-6">
                        <div className="relative">
                            {/* 프로필 이미지 */}
                            <Image
                                src={
                                    buddy?.buddy_profile_pic ||
                                    '/images/mascot_happy.webp'
                                }
                                alt="profile"
                                width={100}
                                height={100}
                                className="rounded-full w-[100px] h-[100px]"
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
                    </div>
                    <div className="mt-6">
                        <table className="w-full">
                            <tbody>
                                <ProfileEditColumn
                                    label="닉네임"
                                    value={buddy.buddy_nickname}
                                />
                                <ProfileEditColumn label="성별" value="여성" />
                                <ProfileEditColumn
                                    label="출생년도"
                                    value={String(
                                        getAgeFromBirthDate(
                                            buddy?.buddy_birth || '',
                                        ),
                                    )}
                                />
                                <ProfileEditColumn
                                    label="소개"
                                    value={buddy.buddy_introduction || ''}
                                />
                                <ProfileEditColumn label="MBTI" value="ENFP" />
                                <ProfileEditColumn
                                    label="거주지"
                                    value={buddy.buddy_region || ''}
                                />
                            </tbody>
                        </table>

                        <div
                            className="flex justify-between py-2 cursor-pointer"
                            onClick={() => toggleAccordion('journey')}
                        >
                            <span className="w-1/2 text-gray-600">
                                선호 여정
                            </span>
                            <span className="w-1/2 text-blue-500 text-right">
                                {isOpen.journey ? '-' : '+'}
                            </span>
                        </div>
                        {isOpen.journey && (
                            <div className="pl-4 mb-4">
                                <span className="inline-block bg-main-color rounded-full px-3 py-1 text-sm text-white mr-2">
                                    {buddy.buddy_preferred_theme1}
                                </span>
                                <span className="inline-block bg-main-color rounded-full px-3 py-1 text-sm text-white mr-2">
                                    {buddy.buddy_preferred_theme2}
                                </span>
                                <span className="inline-block bg-main-color rounded-full px-3 py-1 text-sm text-white mr-2">
                                    {buddy.buddy_preferred_theme3}
                                </span>
                            </div>
                        )}

                        <div
                            className="flex justify-between py-2 cursor-pointer"
                            onClick={() => toggleAccordion('personality')}
                        >
                            <span className="w-1/2 text-gray-600">
                                버디즈 성향
                            </span>
                            <span className="w-1/2 text-blue-500 text-right">
                                {isOpen.personality ? '-' : '+'}
                            </span>
                        </div>
                        {isOpen.personality && (
                            <div className="pl-4 mb-4">
                                <span className="inline-block bg-main-color rounded-full px-3 py-1 text-sm text-white mr-2">
                                    {buddy.buddy_preferred_buddy1}
                                </span>
                                <span className="inline-block bg-main-color rounded-full px-3 py-1 text-sm text-white mr-2">
                                    {buddy.buddy_preferred_buddy2}
                                </span>
                                <span className="inline-block bg-main-color rounded-full px-3 py-1 text-sm text-white mr-2">
                                    {buddy.buddy_preferred_buddy3}
                                </span>
                            </div>
                        )}

                        <div
                            className="flex justify-between py-2 cursor-pointer"
                            onClick={() => toggleAccordion('password')}
                        >
                            <span className="w-1/2 text-gray-600">
                                비밀번호 변경
                            </span>
                            <Link href="/recover">
                                <span className="w-1/2 text-blue-500 text-right">
                                    {'>'}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center p-4 min-h-screen">
                <div className="w-full max-w-lg rounded-lg p-6 flex flex-col items-center">
                    <Image
                        src="/images/mascot_main.webp"
                        alt="profile"
                        width={100}
                        height={100}
                        className="rounded-full w-[100px] h-[100px]"
                    />
                </div>
                <span className="text-gray-500">추가 정보를 기입해주세요!</span>
            </div>
        );
    }
}

export default EditProfilePage;
