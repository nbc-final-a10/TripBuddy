import React from 'react';

export default function WelcomeMessage() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex mt-10 mb-10 text-2xl xl:text-4xl xl:mt-20 xl:mb-20">
                버디즈 모집을 시작해볼까요?
            </div>
            <div className="flex flex-col items-center text-gray-600 xl:text-lg xl:mb-10">
                <p>OO님과 딱 맞는</p>
                <p>버디즈와 추억을 만들어보세요!</p>
            </div>
        </div>
    );
}
