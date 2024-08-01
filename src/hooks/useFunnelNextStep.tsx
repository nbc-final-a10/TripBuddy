'use client';

import { useCallback, useState } from 'react';

type UseNextButtonProps = {
    initialStep?: number;
    limit: number;
    buttonText: string;
    validateStep?: () => boolean;
};

const useNextButton = ({
    initialStep = 0,
    limit,
    buttonText,
    validateStep,
}: UseNextButtonProps) => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(() => {
        if (validateStep) {
            const isValid = validateStep();
            if (!isValid) return; // 유효성 검사 실패 시 스텝 증가 안 함
        }
        if (step < limit) {
            setStep(prevStep => prevStep + 1);
        }
    }, [setStep, step, limit, validateStep]);

    const NextButton = ({
        className,
        onClick,
    }: {
        className: string;
        onClick?: () => void;
    }) => (
        <button
            onClick={e => {
                e.preventDefault();
                handleNext();
                if (onClick) onClick();
            }}
            className={className}
        >
            {buttonText}
        </button>
    );

    return { NextButton, step, setStep };
};

export default useNextButton;
