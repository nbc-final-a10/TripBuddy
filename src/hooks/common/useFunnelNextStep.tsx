'use client';

import React, { useCallback, useState } from 'react';

type UseNextButtonProps = {
    initialStep?: number;
    limit: number;
    buttonText: string;
    disabled?: boolean;
    validateStep?: () => boolean | Promise<boolean>;
};

export const useNextButton = ({
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
            if (!isValid) return false; // 유효성 검사 실패 시 스텝 증가 안 함
        }
        return true;
    }, [validateStep, disabled]);

    const NextButton = ({
        className,
        onClick,
        disabled = false,
        ...props
    }: {
        className: string;
        onClick?: () => void;
        disabled?: boolean;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button
            onClick={async e => {
                e.preventDefault();
                const isValid = await handleNext();
                if (!isValid) return;
                if (step < limit) setStep(prevStep => prevStep + 1);
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
