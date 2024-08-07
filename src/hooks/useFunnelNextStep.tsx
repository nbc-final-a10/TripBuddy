'use client';

import React, { useCallback, useState } from 'react';

type UseNextButtonProps = {
    initialStep?: number;
    limit: number;
    buttonText: string;
    disabled?: boolean;
    validateStep?: () => boolean | Promise<boolean>;
};

const useNextButton = ({
    initialStep = 0,
    limit,
    buttonText,
    disabled = false,
    validateStep,
}: UseNextButtonProps) => {
    const [step, setStep] = useState(initialStep);

    const handleNext = useCallback(async () => {
        if (disabled) return;
        if (validateStep) {
            const isValid = await validateStep();
            if (!isValid) return; // 유효성 검사 실패 시 스텝 증가 안 함
        }
        if (step < limit) {
            setStep(prevStep => prevStep + 1);
        }
    }, [setStep, step, limit, validateStep, disabled]);

    const NextButton = ({
        className,
        onClick,
        disabled = false,
        ...props
    }: {
        className: string;
        onClick?: () => void;
        disabled?: boolean;
    }) => (
        <button
            onClick={async e => {
                e.preventDefault();
                await handleNext();
                if (onClick) onClick();
            }}
            className={className}
            disabled={disabled}
            {...props}
        >
            {buttonText}
        </button>
    );

    return { NextButton, step, setStep };
};

export default useNextButton;
