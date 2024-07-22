'use client';

import { useCallback, useState } from 'react';

const useNextButton = (initialStep: number, buttonText: string = '다음') => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        setStep(step + 1);
    }, [step, setStep]);

    const NextButton = () => (
        <div className="flex justify-center">
            <button
                onClick={handleNext}
                className="mt-4 px-4 py-2 bg-yellow-500 text-black text-2xl rounded"
            >
                {buttonText}
            </button>
        </div>
    );

    return { NextButton, step };
};

export default useNextButton;
