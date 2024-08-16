'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import MyTrips from '@/components/atoms/profile/MyTrips';
import BuddyFollow from '@/components/molecules/profile/BuddyFollow';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { useAuth } from '@/hooks';
import { useBuddyProfile } from '@/hooks/queries';
import { ProfilePageProps } from '@/types/ProfileParams.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import Link from 'next/link';
import React from 'react';

function ProfilePage({ params }: ProfilePageProps) {
    const { buddy, logOut } = useAuth();
    const { data: clickedBuddy, isLoading, error } = useBuddyProfile(params.id);

    const handleLogOut = () => {
        logOut();
        showAlert('success', '로그아웃 완료되었습니다.');
    };

    if (error) {
        return <div>버디 프로필을 가져오는 중 오류가 발생했습니다.</div>;
    }

    return (
        <>
            <section className="flex flex-col items-center justify-center w-full h-full">
                <BuddyProfile
                    clickedBuddy={clickedBuddy || null}
                    loading={isLoading}
                    buddy={buddy}
                    urlId={`${params.id}`}
                />
            </section>

            <section className="w-full h-full flex justify-center items-center my-4">
                <div className="flex flex-row items-center mx-4 space-x-4 w-full">
                    <span className="flex-1">
                        <Link
                            href={`/profile/follow/${params.id}?view=following`}
                        >
                            <BuddyFollow
                                id={params.id}
                                type="팔로잉"
                                count={
                                    clickedBuddy?.buddy_following_counts || 0
                                }
                            />
                        </Link>
                    </span>
                    <span className="border-l border-gray-300 h-10 mx-2" />
                    <span className="flex-1">
                        <Link
                            href={`/profile/follow/${params.id}?view=follower`}
                        >
                            <BuddyFollow
                                id={params.id}
                                type="팔로워"
                                count={clickedBuddy?.buddy_follower_counts || 0}
                            />
                        </Link>
                    </span>
                </div>
                <div className="flex flex-col items-center mr-8 w-full">
                    <span className="w-full">
                        <BuddyTemperature
                            temperature={clickedBuddy?.buddy_temperature || 0}
                        />
                    </span>
                </div>
            </section>

            <section className="mt-16 mx-8">
                <MyTrips id={params.id} />
            </section>

            {buddy?.buddy_id === clickedBuddy?.buddy_id && (
                <section className="mt-16 mx-8">
                    <button
                        className="bg-main-color text-white font-bold h-10 w-full rounded-xl"
                        onClick={handleLogOut}
                    >
                        로그아웃
                    </button>
                </section>
            )}
        </>
    );
}

export default ProfilePage;
