'use client';

import { useCallback } from 'react';

const useNextButton = (step: number, setStep: (step: number) => void) => {
    const handleNext = useCallback(() => {
        setStep(step + 1);
    }, [step, setStep]);

    const NextButton = () => (
        <div className="flex justify-center">
            <button
                onClick={handleNext}
                className="mt-4 px-4 py-2 bg-yellow-500 text-black text-2xl rounded"
            >
                다음
            </button>
        </div>
    );

    return NextButton;
};

export default useNextButton;
