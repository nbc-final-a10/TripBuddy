'use client';

import Title from '@/components/atoms/common/O_Title';
import { useAuth } from '@/hooks/auth';
import React from 'react';

const OnBoardingWelcome: React.FC = () => {
    const { buddy } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Title>{`${buddy?.buddy_email}사용자님, 안녕하세요!`}</Title>
        </div>
    );
};

export default OnBoardingWelcome;
