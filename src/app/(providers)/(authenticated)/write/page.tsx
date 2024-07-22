'use client';

import NextPage from '@/components/organisms/write/NextPage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const WritePage: React.FC = () => {
    const { NextButton, step } = useNextButton(0, '다음');

    return (
        <>
            <div style={{ flex: 1 }}>
                {step === 0 && <WelcomePage />}
                {step === 1 && <NextPage />}
            </div>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <NextButton />
            </div>
        </>
    );
};

export default WritePage;
