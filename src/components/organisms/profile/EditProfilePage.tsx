'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Buddy } from '@/types/Auth.types';
import EditProfileSkeleton from '@/components/molecules/profile/EditProfileSkeleton';
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

    const toggleAccordion = (key: keyof typeof isOpen) => {
        setIsOpen(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    if (!buddy) {
        return <EditProfileSkeleton />;
    }

    return (
        <div className="flex flex-col items-center p-4 min-h-screen">
            <div className="w-full max-w-lg rounded-lg p-6">
                <div className="flex flex-col items-center mt-6">
                    <div className="relative">
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
                        <button className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full border-4 border-white">
                            <svg
                                className="w-2 h-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM12 2a10 10 0 100 20 10 10 0 000-20z" />
                                <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
                            </svg>
                        </button>
                    </div>
                    <button className="mt-2">프로필 사진 삭제</button>
                </div>
                <div className="mt-6">
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between pb-2">
                            <span className="text-gray-600 w-1/3 font-bold">
                                닉네임
                            </span>
                            <span className="text-gray-800 w-2/3">
                                {buddy.buddy_nickname}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span className="text-gray-6000 w-1/3 font-bold">
                                성별
                            </span>
                            <span className="text-gray-800 w-2/3">
                                {buddy.buddy_sex}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span className="text-gray-600 w-1/3 font-bold">
                                출생년도
                            </span>
                            <span className="text-gray-800 w-2/3">
                                {buddy?.buddy_birth
                                    ? new Date(
                                          buddy.buddy_birth,
                                      ).toLocaleDateString('ko-KR')
                                    : ''}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span className="text-gray-600 w-1/3 font-bold">
                                소개
                            </span>
                            <span className="text-gray-800 w-2/3">
                                {buddy.buddy_introduction}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span className="text-gray-600 w-1/3 font-bold">
                                MBTI
                            </span>
                            <span className="text-gray-800 w-2/3">
                                {buddy.buddy_mbti}
                            </span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span className="text-gray-600 w-1/3 font-bold">
                                거주지
                            </span>
                            <span className="text-gray-800 w-2/3">
                                {buddy.buddy_region}
                            </span>
                        </div>
                    </div>

                    <div
                        className="flex justify-between py-2 cursor-pointer"
                        onClick={() => toggleAccordion('journey')}
                    >
                        <span className="w-1/2 text-gray-600 font-bold">
                            선호 여정
                        </span>
                        <span className="w-1/2 text-blue-500 text-right">
                            {isOpen.journey ? '-' : '+'}
                        </span>
                    </div>
                    {isOpen.journey && (
                        <div className="pl-4 mb-4">
                            {[
                                buddy.buddy_preferred_theme1,
                                buddy.buddy_preferred_theme2,
                                buddy.buddy_preferred_theme3,
                            ].map((theme, index) => (
                                <span
                                    key={index}
                                    className="w-full px-2 py-1 mb-2 block"
                                >
                                    {theme || ''}
                                </span>
                            ))}
                        </div>
                    )}

                    <div
                        className="flex justify-between py-2 cursor-pointer"
                        onClick={() => toggleAccordion('personality')}
                    >
                        <span className="w-1/2 text-gray-600 font-bold">
                            버디즈 성향
                        </span>
                        <span className="w-1/2 text-blue-500 text-right">
                            {isOpen.personality ? '-' : '+'}
                        </span>
                    </div>
                    {isOpen.personality && (
                        <div className="pl-4 mb-4">
                            {[
                                buddy.buddy_preferred_buddy1,
                                buddy.buddy_preferred_buddy2,
                                buddy.buddy_preferred_buddy3,
                            ].map((buddyPref, index) => (
                                <span
                                    key={index}
                                    className="w-full px-2 py-1 mb-2 block"
                                >
                                    {buddyPref || ''}
                                </span>
                            ))}
                        </div>
                    )}

                    <div
                        className="flex justify-between py-2 cursor-pointer"
                        onClick={() => toggleAccordion('password')}
                    >
                        <span className="w-1/2 text-gray-600 font-bold">
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
}

export default EditProfilePage;
