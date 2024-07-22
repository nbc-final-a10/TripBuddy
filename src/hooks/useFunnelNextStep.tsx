'use client';

import { useCallback, useState } from 'react';

const useNextButton = (initialStep: number, buttonText: string = '다음') => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        setStep(step + 1);
    }, [step, setStep]);

    const NextButton = () => (
        <>
            <button onClick={handleNext} className="text-2xl">
                {buttonText}
            </button>
        </>
    );

    return { NextButton, step };
};

export default useNextButton;
