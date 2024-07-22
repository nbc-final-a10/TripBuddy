'use client';

import NextPage from '@/components/organisms/write/NextPage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const WritePage: React.FC = () => {
    const { NextButton, step } = useNextButton(0, '다음');

    return (
        <>
            <div>
                {step === 0 && <WelcomePage />}
                {step === 1 && <NextPage />}
            </div>
            <NextButton />
        </>
    );
};

export default WritePage;
