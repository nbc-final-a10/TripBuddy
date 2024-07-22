'use client';

import NextPage from '@/components/organisms/write/NextPage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFunnelNextStep';
import React from 'react';

const WritePage: React.FC = () => {
    const { NextButton, step } = useNextButton(0, '다음');

    return (
        <section className="h-dvh flex flex-col justify-center items-center">
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                {step === 0 && <WelcomePage />}
                {step === 1 && <NextPage />}
            </div>
            <div
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <NextButton />
            </div>
        </section>
    );
};

export default WritePage;
