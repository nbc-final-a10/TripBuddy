import EditProfileButton from '@/components/atoms/profile/EditProfileButton';
import { Buddy } from '@/types/Auth.types';
import { getAgeFromBirthDate } from '@/utils/common/getAgeFromBirthDate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BuddyProfileSkeleton from './BuddyProfileSkeleton';

type BuddyProfileProps = {
    clickedBuddy: Buddy | null;
    loading: boolean;
};

export default function BuddyProfile({
    clickedBuddy,
    loading,
}: BuddyProfileProps) {
    if (loading) {
        return <BuddyProfileSkeleton />;
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 mt-4 xl:mt-8">
            <div className="flex items-center">
                <div className="flex flex-col items-center">
                    <Image
                        src={
                            clickedBuddy?.buddy_profile_pic ||
                            '/images/mascot_happy.webp'
                        }
                        alt="profile"
                        width={100}
                        height={100}
                        className="rounded-full w-[100px] h-[100px]"
                    />
                    <Link href={`/profile/edit/${clickedBuddy?.buddy_id}`}>
                        <EditProfileButton />
                    </Link>
                </div>
                <div className="ml-4">
                    <div className="flex flex-col ">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold xl:text-3xl">
                                {clickedBuddy?.buddy_nickname}
                            </span>
                            <span className="bg-main-color rounded-full px-3 py-1 text-sm text-white ml-2">
                                {clickedBuddy?.buddy_mbti}
                            </span>
                        </div>
                        <p className="mt-2 text-gray-500">
                            {clickedBuddy?.buddy_birth &&
                                getAgeFromBirthDate(
                                    clickedBuddy?.buddy_birth,
                                )}{' '}
                            세 / {clickedBuddy?.buddy_sex}
                        </p>
                        <p className="text-gray-500">
                            {clickedBuddy?.buddy_introduction}
                        </p>
                        <p className="mt-2 text-gray-500">
                            {clickedBuddy?.buddy_region}
                        </p>

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
                                    선호하는 버디를 등록해주세요.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
