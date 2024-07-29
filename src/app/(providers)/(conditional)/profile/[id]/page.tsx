'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import MyTrips from '@/components/atoms/profile/MyTrips';
import BuddyFollow from '@/components/molecules/profile/BuddyFollow';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { ProfilePageProps } from '@/types/ProfileParams.types';

function ProfilePage({ params }: ProfilePageProps) {
    return (
        <>
            <section>유저 아이디 {params.id}</section>

            <section className="flex flex-col items-center justify-center w-full h-full">
                <BuddyProfile id={params.id} />
            </section>

            <section className="w-full h-full">
                <BuddyFollow id={params.id} />
            </section>

            <section>
                <BuddyTemperature id={params.id} />
            </section>

            <section className="mt-16 mx-8">
                <MyTrips id={params.id} />
            </section>
        </>
    );
}

export default ProfilePage;
