'use client';

import EditProfileButton from '@/components/atoms/profile/EditProfileButton';
import { Buddy } from '@/types/Auth.types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import BuddyProfileSkeleton from './BuddyProfileSkeleton';
import FollowButton from '@/components/atoms/profile/FollowButton';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import BlurredBuddyProfile from './BlurredBuddyProfile';

type BuddyProfileProps = {
    clickedBuddy: Buddy | null;
    loading: boolean;
    buddy?: Buddy | null;
    urlId?: string;
};

export default function BuddyProfile({
    clickedBuddy,
    loading,
    buddy = null,
    urlId = '',
}: BuddyProfileProps) {
    const [isTripsPage, setIsTripsPage] = useState(false);
    const [isProfilePage, setIsProfilePage] = useState(false);

    const { buddy: currentBuddy } = useAuth();
    const router = useRouter();

    useEffect(() => {
        setIsTripsPage(window.location.pathname.includes('trips'));
        setIsProfilePage(window.location.pathname.includes('profile'));
    }, []);

    if (loading) {
        return <BuddyProfileSkeleton />;
    }

    return (
        <div className="relative flex flex-col items-center justify-center p-4 mt-4 xl:mt-8">
            <div className={`flex items-center ${!currentBuddy && 'blur-sm'}`}>
                <div className="flex flex-col items-center">
                    <Image
                        src={
                            clickedBuddy?.buddy_profile_pic ||
                            '/images/mascot_happy.webp'
                        }
                        alt="profile"
                        width={100}
                        height={100}
                        className={`rounded-full ${isTripsPage ? 'w-[80px] h-[80px]' : 'w-[100px] h-[100px]'}`}
                    />
                    {buddy?.buddy_id === urlId &&
                    // url에 'profile'이 포함되어 있으면 편집 버튼 보여주기
                    isProfilePage ? (
                        <Link href={`/onboarding?funnel=0&mode=edit`}>
                            <EditProfileButton />
                        </Link>
                    ) : (
                        <FollowButton />
                    )}
                </div>
                <div className="ml-4">
                    <div className="flex flex-col ">
                        <div className="flex items-center">
                            <span
                                className={`font-bold ${isTripsPage ? 'text-lg' : 'text-2xl'} ${isTripsPage ? 'xl:text-xl' : 'xl:text-3xl'}`}
                            >
                                {clickedBuddy?.buddy_nickname}
                            </span>
                            {clickedBuddy?.buddy_mbti ? (
                                <span className="bg-main-color rounded-full px-3 py-1 text-sm text-white ml-2">
                                    {clickedBuddy?.buddy_mbti}
                                </span>
                            ) : (
                                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 ml-2">
                                    MBTI 없음
                                </span>
                            )}
                        </div>

                        {/* 나이와 성별 */}
                        {clickedBuddy?.buddy_birth ? (
                            <p
                                className={`mt-2 text-gray-500 ${isTripsPage ? 'text-sm' : 'text-base'}`}
                            >
                                {`${clickedBuddy?.buddy_birth?.split('-')[0]}
                                년생 / ${clickedBuddy?.buddy_sex}`}
                            </p>
                        ) : (
                            <p
                                className={`mt-2 text-gray-500 ${isTripsPage ? 'text-sm' : 'text-base'}`}
                            >
                                생년월일 정보가 없습니다.
                            </p>
                        )}
                        {/* 소개글 */}
                        {clickedBuddy?.buddy_introduction ? (
                            <p
                                className={`text-gray-500 ${isTripsPage ? 'text-sm' : 'text-base'}`}
                            >
                                {clickedBuddy?.buddy_introduction}
                            </p>
                        ) : (
                            <p
                                className={`text-gray-500 ${isTripsPage ? 'text-sm' : 'text-base'}`}
                            >
                                소개글이 없습니다.
                            </p>
                        )}
                        {/* 지역 */}
                        {clickedBuddy?.buddy_region ? (
                            <p
                                className={`mt-2 text-gray-500 font-bold ${isTripsPage ? 'text-sm' : 'text-base'}`}
                            >
                                {clickedBuddy?.buddy_region} 거주
                            </p>
                        ) : (
                            <p
                                className={`mt-2 text-gray-500 ${isTripsPage ? 'text-sm' : 'text-base'}`}
                            >
                                지역 정보가 없습니다.
                            </p>
                        )}

                        {/* 선호하는 버디 chips */}
                        {clickedBuddy?.buddy_preferred_buddy1 ? (
                            <div className="mt-4">
                                <span className="bg-[#fff0d1] rounded-full px-3 py-1 text-sm font-semibold text-main-color mr-2">
                                    {clickedBuddy?.buddy_preferred_buddy1}
                                </span>
                                <span className="bg-[#fff0d1] rounded-full px-3 py-1 text-sm font-semibold text-main-color mr-2">
                                    {clickedBuddy?.buddy_preferred_buddy2}
                                </span>
                                <span className="bg-[#fff0d1] rounded-full px-3 py-1 text-sm font-semibold text-main-color">
                                    {clickedBuddy?.buddy_preferred_buddy3}
                                </span>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                    선호하는 버디가 없습니다.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!currentBuddy && <BlurredBuddyProfile />}
        </div>
    );
}
