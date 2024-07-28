'use client';

import { useAuth } from '@/hooks/auth';
import React, { useEffect } from 'react';

const LoadingPage: React.FC = () => {
    const { naverLogIn } = useAuth();

    useEffect(() => {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get('access_token');
            if (accessToken) {
                naverLogIn();
            }
        }
        // 의존선 선언하면 바로 콜스택 터짐...
    }, []);

    return <div>Loading...</div>;
};

export default LoadingPage;
