import React from 'react';
import WelcomeMessage from '../../atoms/write/WelcomeMessage';
import WelcomeImage from '../../atoms/write/WelcomeImage';

const WelcomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <WelcomeMessage />
            <div className="mt-10 xl:mt-0 xl:ml-10">
                <WelcomeImage />
            </div>
        </div>
    );
};

export default WelcomePage;
