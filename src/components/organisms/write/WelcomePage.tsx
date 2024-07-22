import WelcomeImage from '@/components/molecules/write/WelcomeImage';
import WelcomeMessage from '@/components/molecules/write/WelcomeMessage';
import WelcomeSelectBuddyCounts from '@/components/molecules/write/WelcomeSelectBuddyCounts';
import React from 'react';

const WelcomePage = ({ setStep }: { setStep: (step: number) => void }) => {
    return (
        <div className="flex flex-col items-center">
            <WelcomeMessage />
            <div className="mt-10 xl:mt-0 xl:ml-10">
                <WelcomeImage />
            </div>
            <WelcomeSelectBuddyCounts />
            <button onClick={() => setStep(1)}>다음</button>
        </div>
    );
};

export default WelcomePage;
