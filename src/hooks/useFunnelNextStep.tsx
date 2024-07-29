'use client';

import { useCallback, useState } from 'react';

type UseNextButtonProps = {
    initialStep?: number;
    limit: number;
    buttonText: string;
    onNextButtonClick?: () => void;
};

const useNextButton = ({
    initialStep = 0,
    limit,
    buttonText,
    onNextButtonClick = () => {},
}: UseNextButtonProps) => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        if (step < limit) {
            setStep(prevStep => prevStep + 1);
        }
        onNextButtonClick();
    }, [setStep, step, limit, onNextButtonClick]);

    const NextButton = ({ className }: { className: string }) => (
        <button onClick={handleNext} className={className}>
            {buttonText}
        </button>
    );

    return { NextButton, step, setStep };
};

export default useNextButton;
