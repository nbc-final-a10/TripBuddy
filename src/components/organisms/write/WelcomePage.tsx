import MascotImage from '@/components/atoms/common/O_MascotImage';
import WelcomeMessage from '@/components/molecules/write/WelcomeMessage';
import React from 'react';

type WelcomePageProps = {
    SelectBuddyCounts: React.FC;
};

const WelcomePage: React.FC<WelcomePageProps> = ({ SelectBuddyCounts }) => {
    return (
        <div className="flex flex-col items-center">
            <WelcomeMessage />
            <div className="mt-4" />
            <div className="flex justify-center h-[300px] w-[300px] xl:h-[400px] xl:w-[400px]">
                <MascotImage intent="main" />
            </div>
            <div className="flex mt-5 mb-2 text-2xl xl:text-4xl xl:mt-5 xl:mb-5">
                여정 인원을 선택해주세요
            </div>
            <div className="flex flex-col items-center text-gray-600 text-sm xl:text-lg mb-2 xl:mb-10">
                <p>최대 여정 인원은 4명까지 선택 가능해요.</p>
            </div>
            <SelectBuddyCounts />
        </div>
    );
};

export default WelcomePage;
