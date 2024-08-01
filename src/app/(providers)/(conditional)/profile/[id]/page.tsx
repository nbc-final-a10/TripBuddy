'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import MyTrips from '@/components/atoms/profile/MyTrips';
import BuddyFollow from '@/components/molecules/profile/BuddyFollow';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { useAuth } from '@/hooks/auth';
import { ProfilePageProps } from '@/types/ProfileParams.types';
import { Buddy } from '@/types/Auth.types';
import { useEffect, useState } from 'react';

function ProfilePage({ params }: ProfilePageProps) {
    const { buddy, logOut } = useAuth();

    const [clickedBuddy, setClickedBuddy] = useState<Buddy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClickedBuddy = async () => {
            try {
                const response = await fetch(
                    `/api/buddyProfile/buddy?id=${params.id}`,
                );
                const data = await response.json();
                console.log(data);
                setClickedBuddy(data.buddies[0]);
                setLoading(false);
            } catch (error) {
                console.error('버디 통신 오류 발생:', error);
            }
        };
        fetchClickedBuddy();
    }, [params.id]);

    return (
        <>
            <section className="flex flex-col items-center justify-center w-full h-full">
                <BuddyProfile
                    clickedBuddy={clickedBuddy || null}
                    loading={loading}
                />
            </section>

            <section className="w-full h-full">
                <BuddyFollow id={params.id} />
            </section>

            <section>
                <BuddyTemperature temperature={buddy?.buddy_temperature || 0} />
            </section>

            <section className="mt-16 mx-8">
                <MyTrips id={params.id} />
            </section>

            {buddy?.buddy_id === clickedBuddy?.buddy_id && (
                <section className="mt-16 mx-8">
                    <button
                        className="bg-main-color text-white font-bold h-10 w-full rounded-xl"
                        onClick={logOut}
                    >
                        로그아웃
                    </button>
                </section>
            )}
        </>
    );
}

export default ProfilePage;
