import { useCallback } from 'react';

const useNextButton = (step: number, setStep: (step: number) => void) => {
    const handleNext = useCallback(() => {
        setStep(step + 1);
    }, [step, setStep]);

    const NextButton = () => (
        <button
            onClick={handleNext}
            className="mt-4 px-4 py-2 bg-secondary-color text-white rounded"
        >
            다음
        </button>
    );

    return NextButton;
};

export default useNextButton;
