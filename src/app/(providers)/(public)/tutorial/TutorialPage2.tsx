// src/components/organisms/tutorial/TutorialPage2.tsx
import React from 'react';
import Image from 'next/image';

const TutorialPage2 = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <h2 className="text-lg font-semibold mb-4 text-center"></h2>
            <Image
                src="/images/tuto2.png"
                alt="더미데이터"
                width={500}
                height={500}
            />
        </div>
    );
};

export default TutorialPage2;
