import WelcomeImage from '@/components/molecules/write/WelcomeImage';
import WelcomeMessage from '@/components/molecules/write/WelcomeMessage';
import WelcomeSelectBuddyCounts from '@/components/molecules/write/WelcomeSelectBuddyCounts';
import React from 'react';

const WelcomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <WelcomeMessage />
            <div className="mt-4" />
            <div className="mt-10 xl:mt-0 flex justify-center">
                <WelcomeImage />
            </div>
            <WelcomeSelectBuddyCounts />
        </div>
    );
};

export default WelcomePage;
