// src/components/organisms/tutorial/TutorialPage2.tsx
import React from 'react';
import Image from 'next/image';

const TutorialPage2 = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <h2 className="text-lg font-semibold mb-4 text-center">
                점점 쌓이는 포인트로 나만의 사무실을 꾸미고 승진의 기회까지
                잡으세요!
            </h2>
            <Image
                src="/images/tuto2.png"
                alt="사무실 꾸미기"
                width={500}
                height={500}
            />
        </div>
    );
};

export default TutorialPage2;
