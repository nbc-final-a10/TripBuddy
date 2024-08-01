import Loading from '@/app/(providers)/loading';
import EditProfileButton from '@/components/atoms/profile/EditProfileButton';
import ProfileImage from '@/components/atoms/profile/ProfileImage';
import { useAuth } from '@/hooks/auth';
import { Buddy } from '@/types/Auth.types';
import { getAgeFromBirthDate } from '@/utils/common/getAgeFromBirthDate';
import Link from 'next/link';
import React from 'react';

type BuddyProfileProps = {
    clickedBuddy: Buddy | null;
    loading: boolean;
};

export default function BuddyProfile({
    clickedBuddy,
    loading,
}: BuddyProfileProps) {
    const { buddy } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 mt-4 xl:mt-8">
            <div className="flex items-center">
                <div className="flex flex-col items-center">
                    <ProfileImage />
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
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 ml-2">
                                {clickedBuddy?.buddy_mbti}
                            </span>
                        </div>
                        <p className="mt-2 text-gray-500">
                            {clickedBuddy?.buddy_birth &&
                                getAgeFromBirthDate(
                                    clickedBuddy?.buddy_birth,
                                )}{' '}
                            / {clickedBuddy?.buddy_sex}
                        </p>
                        <p className="text-gray-500">
                            {clickedBuddy?.buddy_introduction}
                        </p>
                        <p className="mt-2 text-gray-500">
                            {clickedBuddy?.buddy_region}
                        </p>

                        <div className="mt-4">
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {clickedBuddy?.buddy_preferred_buddy1}
                            </span>
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                {clickedBuddy?.buddy_preferred_buddy2}
                            </span>
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                {clickedBuddy?.buddy_preferred_buddy3}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
