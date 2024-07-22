'use client';

import { useCallback, useState } from 'react';

const useNextButton = (
    initialStep: number,
    buttonText: string = '다음',
    limit: number,
) => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        setStep(prevStep => prevStep + 1);
    }, [setStep]);

    const NextButton = ({ className }: { className: string }) => (
        <button onClick={handleNext} className={className}>
            {buttonText}
        </button>
    );

    return { NextButton, step };
};

export default useNextButton;
