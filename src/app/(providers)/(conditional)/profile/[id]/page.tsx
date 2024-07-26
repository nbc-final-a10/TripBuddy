'use client';

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
        <section>
            <BuddyProfile />
        </section>
    );
};

export default ProfilePage;
