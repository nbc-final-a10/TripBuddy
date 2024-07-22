'use client';

import NextPage from '@/components/organisms/write/NextPage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import useNextButton from '@/hooks/useFennelNextStep';
import React, { useState } from 'react';

const WritePage: React.FC = () => {
    const [step, setStep] = useState(0);
    const NextButton = useNextButton(step, setStep);

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
