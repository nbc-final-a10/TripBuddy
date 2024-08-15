'use client';

import React, { useState, useEffect } from 'react';
import NextImage from 'next/image';
import DefaultLoader from '../common/DefaultLoader';

type TutoProps = {
    step: number;
};

const content = [
    {
        src: '/images/tuto0.webp',
        alt: '첫 번째 튜토리얼 페이지에서 사용되는 이미지',
        title: <>각자의 성향대로 즐기는 여행!</>,
        description: <>트립버디즈가 나에 대해 알아가는 맞춤형 온보딩!</>,
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
        description: <>평소 여행 스타일, 유형을 통한 맞춤형 추천 서비스!</>,
    },
    {
        src: '/images/tuto2.webp',
        alt: '세 번째 튜토리얼 페이지에서 사용되는 이미지',
        title: <>채팅을 통한 버디즈와 편리한 소통!</>,
        description: <>여정 계획, 맛집 공유 등 다양한 대화를 나눠봐요!</>,
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
        description: <>나와 딱 맞는 버디즈를 직접 골라 여정을 함께해요!</>,
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
    },
    // 필요한 만큼 추가
];

const Tuto: React.FC<TutoProps> = ({ step }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        setIsImageLoaded(false);
        const img = new Image();
        img.src = content[step].src;
        img.onload = () => {
            setIsImageLoaded(true);
        };
        img.onerror = () => {
            setIsImageLoaded(false);
        };
    }, [step]);

    return (
        <div className=" bg-white mt-[8px]">
            {!isImageLoaded && <DefaultLoader />}
            <div className="h-[125px]">
                <h1 className="text-center font-bold text-2xl md:text-3xl ">
                    {content[step].title}
                </h1>
                <p className="text-center text-lg md:text-xl text-gray-600 mb-4 xl:mb-8">
                    {content[step].description}
                </p>
            </div>
            <div className="relative mt-[24px] mb-[24px] h-[500px] flex justify-center items-start">
                <div className="relative w-[324px] h-[426px] aspect-auto">
                    <NextImage
                        src={content[step].src}
                        alt={content[step].alt}
                        fill
                        priority
                        sizes="(max-width: 768px) 100%, (max-width: 1200px) 30%, 33%"
                        className="object-contain min-h-[324px] max-h-[426] w-[100%]  "
                    />
                </div>
            </div>
        </div>
    );
};

export default Tuto;
