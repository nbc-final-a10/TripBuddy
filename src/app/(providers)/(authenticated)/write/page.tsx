'use client';

import NextPage from '@/components/organisms/write/NextPage';
import WelcomePage from '@/components/organisms/write/WelcomePage';
import React, { useState } from 'react';

const WritePage: React.FC = () => {
    const [step, setStep] = useState(0);

    return (
        <div>
            {step === 0 && <WelcomePage setStep={setStep} />}
            {step === 1 && <NextPage />}
        </div>
    );
};

export default WritePage;
