'use client';

import { useAuth } from '@/hooks/auth';
import React, { useEffect } from 'react';

const LoadingPage: React.FC = () => {
    // useAuth 의 함수들은 모두 useCallback 처리함
    const { naverLogIn } = useAuth();

    useEffect(() => {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get('access_token');
            if (accessToken) naverLogIn();
        }
    }, [naverLogIn]);

    return <div>Loading...</div>;
};

export default LoadingPage;