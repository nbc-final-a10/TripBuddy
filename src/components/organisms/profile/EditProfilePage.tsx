'use client';

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

    const [formData, setFormData] = useState({
        nickname: buddy.buddy_nickname,
        gender: '여성',
        birthYear: String(getAgeFromBirthDate(buddy?.buddy_birth || '')),
        introduction: buddy.buddy_introduction || '',
        mbti: 'ENFP',
        region: buddy.buddy_region || '',
        preferredTheme1: buddy.buddy_preferred_theme1,
        preferredTheme2: buddy.buddy_preferred_theme2,
        preferredTheme3: buddy.buddy_preferred_theme3,
        preferredBuddy1: buddy.buddy_preferred_buddy1,
        preferredBuddy2: buddy.buddy_preferred_buddy2,
        preferredBuddy3: buddy.buddy_preferred_buddy3,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const toggleAccordion = (key: keyof typeof isOpen) => {
        setIsOpen(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const renderProfileEditColumn = (
        label: string,
        name: keyof typeof formData,
    ) => (
        <tr>
            <td className="w-1/3 text-gray-600">{label}</td>
            <td className="w-2/3">
                <input
                    type="text"
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 py-1"
                />
            </td>
        </tr>
    );

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
                            {renderProfileEditColumn('닉네임', 'nickname')}
                            {renderProfileEditColumn('성별', 'gender')}
                            {renderProfileEditColumn('출생년도', 'birthYear')}
                            {renderProfileEditColumn('소개', 'introduction')}
                            {renderProfileEditColumn('MBTI', 'mbti')}
                            {renderProfileEditColumn('거주지', 'region')}
                        </tbody>
                    </table>

                    <div
                        className="flex justify-between py-2 cursor-pointer"
                        onClick={() => toggleAccordion('journey')}
                    >
                        <span className="w-1/2 text-gray-600">선호 여정</span>
                        <span className="w-1/2 text-blue-500 text-right">
                            {isOpen.journey ? '-' : '+'}
                        </span>
                    </div>
                    {isOpen.journey && (
                        <div className="pl-4 mb-4">
                            {[
                                'preferredTheme1',
                                'preferredTheme2',
                                'preferredTheme3',
                            ].map((theme, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name={theme}
                                    value={
                                        formData[
                                            theme as keyof typeof formData
                                        ] || ''
                                    }
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-2 py-1 mb-2"
                                />
                            ))}
                        </div>
                    )}

                    <div
                        className="flex justify-between py-2 cursor-pointer"
                        onClick={() => toggleAccordion('personality')}
                    >
                        <span className="w-1/2 text-gray-600">버디즈 성향</span>
                        <span className="w-1/2 text-blue-500 text-right">
                            {isOpen.personality ? '-' : '+'}
                        </span>
                    </div>
                    {isOpen.personality && (
                        <div className="pl-4 mb-4">
                            {[
                                'preferredBuddy1',
                                'preferredBuddy2',
                                'preferredBuddy3',
                            ].map((buddy, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    name={buddy}
                                    value={
                                        formData[
                                            buddy as keyof typeof formData
                                        ] || ''
                                    }
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-2 py-1 mb-2"
                                />
                            ))}
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
}

export default EditProfilePage;
