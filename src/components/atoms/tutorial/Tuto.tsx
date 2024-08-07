'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import DefaultLoader from '../common/defaultLoader';

type Content = {
    src: string;
    alt: string;
    title: React.ReactNode;
    description: React.ReactNode;
};

type TutoProps = {
    step: number;
};
const content = [
    {
        src: '/images/tuto0.webp',
        alt: '첫 번째 튜토리얼 페이지에서 사용되는 이미지',
        title: (
            <>
                각자의 성향대로
                <br />
                즐기는 여행!
            </>
        ),
        description: (
            <>
                트립버디즈가 나에 대해 알아가는
                <br />
                맞춤형 온보딩!
            </>
        ),
    },
    {
        src: '/images/tuto1.webp',
        alt: '두 번째 튜토리얼 페이지에서 사용되는 이미지',
        title: (
            <>
                맞춤 추천으로 나에게 맞는
                <br />
                버디즈와 함께!
            </>
        ),
        description: (
            <>
                평소 여행 스타일, 유형을 통한
                <br />
                맞춤형 추천 서비스!
            </>
        ),
    },
    {
        src: '/images/tuto2.webp',
        alt: '세 번째 튜토리얼 페이지에서 사용되는 이미지',
        title: (
            <>
                채팅을 통한 버디즈와
                <br />
                편리한 소통!
            </>
        ),
        description: (
            <>
                여정 계획, 맛집 공유 등<br />
                다양한 대화를 나눠봐요!
            </>
        ),
    },
    {
        src: '/images/tuto3.webp',
        alt: '네 번째 튜토리얼 페이지에서 사용되는 이미지',
        title: (
            <>
                버디즈 프로필을 통해
                <br />
                수락 여부 결정!
            </>
        ),
        description: (
            <>
                나와 딱 맞는 버디즈를
                <br />
                직접 골라 여정을 함께해요!
            </>
        ),
    },
    {
        src: '/images/tuto4.webp',
        alt: '다섯 번째 튜토리얼 페이지에서 사용되는 이미지',
        title: (
            <>
                트립 버디즈와 함께
                <br />
                즐거운 여정을 시작해요!
            </>
        ),
        description: (
            <>
                새로운 친구들과 함께
                <br />
                여행을 즐겨보세요!
            </>
        ),
    },
    // 필요한 만큼 추가
];
const Tuto: React.FC<TutoProps> = ({ step }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = content[step].src;
        img.onload = () => {
            setIsImageLoaded(true);
        };
    }, [step]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[75dvh] bg-white xl:p-4 xl:min-h-full">
            {!isImageLoaded && <DefaultLoader />}
            <h1 className="text-center font-bold text-2xl md:text-3xl mt-4 xl:mt-2 xl:mb-2">
                {content[step].title}
            </h1>
            <p className="text-center text-lg md:text-xl text-gray-600 mb-4 xl:mb-8">
                {content[step].description}
            </p>
            <div className="relative w-full h-[300px] max-h-[60vh] min-h-[300px] aspect-[3/4] xl:h-[350px] xl:max-h-[80vh] xl:min-h-[350px] xl:aspect-[3/4] transition-opacity duration-500">
                <NextImage
                    src={content[step].src}
                    alt={content[step].alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain min-h-[300px] max-h-[100%]"
                />
            </div>
        </div>
    );
};

export default Tuto;
