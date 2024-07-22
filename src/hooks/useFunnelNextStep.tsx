'use client';

import { useCallback, useState } from 'react';

const useNextButton = (initialStep: number, buttonText: string = '다음') => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        setStep(prevStep => prevStep + 1);
    }, [step, setStep]);

    const NextButton = () => (
        <>
            <button
                onClick={handleNext}
                className="text-2xl bg-main-color hover:bg-hover-color text-secondary-color font-bold py-2 px-4 rounded"
            >
                {buttonText}
            </button>
        </>
    );

    return { NextButton, step };
};

export default useNextButton;
