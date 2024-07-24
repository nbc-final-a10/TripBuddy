// src/components/organisms/tutorial/TutorialPage3.tsx
import React from 'react';
import Image from 'next/image';

const TutorialPage3 = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <Image
                src="/images/14F.png"
                alt="14F 로고"
                width={250}
                height={250}
                className="mb-4"
                margin-bottom="500px"
            />

            <div className="login-options flex flex-col gap-2 w-full">
                <button className="bg-green-500 text-white py-2 rounded">
                    이메일로 시작하기
                </button>
                <button className="bg-yellow-400 text-black py-2 rounded">
                    카카오로 시작하기
                </button>
                <button className="bg-green-600 text-white py-2 rounded">
                    네이버로 시작하기
                </button>
                <button className="bg-blue-500 text-white py-2 rounded">
                    구글로 시작하기
                </button>
                <button className="bg-black text-white py-2 rounded">
                    애플로 시작하기
                </button>
            </div>
        </div>
    );
};

export default TutorialPage3;
