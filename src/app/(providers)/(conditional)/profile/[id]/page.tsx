'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import MyTrips from '@/components/atoms/profile/MyTrips';
import BuddyFollow from '@/components/molecules/profile/BuddyFollow';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { useAuth } from '@/hooks/auth';
import { ProfilePageProps } from '@/types/ProfileParams.types';
import { Buddy } from '@/types/Auth.types';

function ProfilePage({ params }: ProfilePageProps) {
    const { buddy } = useAuth();
    return (
        <>
            <section>유저 아이디 {params.id}</section>

            <section className="flex flex-col items-center justify-center w-full h-full">
                <BuddyProfile />
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
        </>
    );
}

export default ProfilePage;
