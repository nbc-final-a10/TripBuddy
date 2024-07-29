'use client';

import MascotImage from '@/components/atoms/common/O_MascotImage';
import Paragraph from '@/components/atoms/common/O_Paragraph';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import React, { useRef } from 'react';

type OnBoardingDividerProps = {
    mode: 'welcome' | 'middle' | 'end';
    name: string;
};

const OnBoardingDivider: React.FC<OnBoardingDividerProps> = ({
    mode,
    name,
}) => {
    // const { buddy } = useAuth();

    const titleRef = useRef<string>(
        mode === 'welcome'
            ? `${name}\n님, 안녕하세요!`
            : mode === 'middle'
              ? `거의 다 왔어요!`
              : '테스트 완료!',
    );

    const paragraphRef = useRef<string>(
        mode === 'welcome'
            ? `다음 단계를 따라 여정을 시작해보세요.`
            : mode === 'middle'
              ? `${name}님과 딱 맞는 여정을 찾고 있어요.`
              : '이제 트립버디즈와 함께\n즐거운 여행을 시작해 볼까요?',
    );

    const imgIntentRef = useRef<'main' | 'blue' | 'happy'>(
        mode === 'welcome' ? 'main' : mode === 'middle' ? 'blue' : 'happy',
    );

    return (
        <OnBoardingWrapper>
            <Title>{titleRef.current}</Title>
            <Paragraph>{paragraphRef.current}</Paragraph>
            <MascotImage intent={imgIntentRef.current} />
        </OnBoardingWrapper>
    );
};

export default OnBoardingDivider;
