'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MyPage = () => {
    const router = useRouter();
    const { id } = router.query;

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
        <div>
            <h1>유저 아이디 </h1>
            <p>이름 </p>
            <p>메일 </p>
            {/* 사용자 데이터와 관련된 추가 정보 렌더링 */}
        </div>
    );
};

export default MyPage;
