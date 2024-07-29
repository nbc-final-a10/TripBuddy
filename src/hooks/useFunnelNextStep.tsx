'use client';

import { useCallback, useState } from 'react';

type UseNextButtonProps = {
    initialStep?: number;
    limit: number;
    buttonText: string;
};

const useNextButton = ({
    initialStep = 0,
    limit,
    buttonText,
}: UseNextButtonProps) => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        if (step < limit) {
            setStep(prevStep => prevStep + 1);
        }
    }, [setStep, step, limit]);

    const NextButton = ({
        className,
        onNextButtonClick = () => {},
    }: {
        className: string;
        onNextButtonClick?: () => void;
    }) => (
        <button
            onClick={() => {
                handleNext();
                onNextButtonClick();
            }}
            className={className}
        >
            {buttonText}
        </button>
    );

    return { NextButton, step, setStep };
};

export default useNextButton;
