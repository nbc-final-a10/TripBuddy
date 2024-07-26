'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import MyTrips from '@/components/atoms/profile/MyTrips';
import BuddyFollow from '@/components/molecules/profile/BuddyFollow';
import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (!id) {
            // id가 없을 경우 처리
            return;
        }
        // ... 사용자 데이터 가져오기 ...
    }, [id]);

    // const [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     if (id) {
    //         fetch(`/api/users/${id}`)
    //             .then(response => response.json())
    //             .then(data => setUserData(data));
    //     }
    // }, [id]);

    // if (!userData) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <section className="flex flex-col items-center justify-center w-full h-full">
                <BuddyProfile />
            </section>

            <section className="w-full h-full">
                <BuddyFollow />
            </section>

            <section>
                <BuddyTemperature />
            </section>

            <section className="mt-16 mx-8">
                <MyTrips />
            </section>
        </>
    );
};

export default ProfilePage;
