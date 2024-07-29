'use client';

import MascotImage from '@/components/atoms/common/O_MascotImage';
import Paragraph from '@/components/atoms/common/O_Paragraph';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import { useAuth } from '@/hooks/auth';
import React from 'react';

const OnBoardingWelcome: React.FC = () => {
    const { buddy } = useAuth();

    return (
        <OnBoardingWrapper>
            <Title>{`${buddy?.buddy_email}\n사용자님, 안녕하세요!`}</Title>
            <Paragraph>{`아래의 단계를 따라 여정을 시작해보세요.`}</Paragraph>
            <MascotImage intent="main" />
        </OnBoardingWrapper>
    );
};

export default OnBoardingWelcome;