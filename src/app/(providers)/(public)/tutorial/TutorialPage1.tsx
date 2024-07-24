import React from 'react';
import Image from 'next/image';

const TutorialPage1 = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <h2 className="text-lg font-semibold mb-4 text-center">
                궁금한 것만 콕콕 집어서 다양한 콘텐츠로 매일 업데이트
            </h2>
            <Image
                src="/images/tuto1.png"
                alt="더미데이터"
                width={500}
                height={500}
                className="w-64 h-64"
            />
        </div>
    );
};

export default TutorialPage1;
