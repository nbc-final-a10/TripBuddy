import React from 'react';
import Image from 'next/image';

type Content = {
    src: string;
    alt: string;
    text: string;
};

type TutoProps = {
    step: number;
};

const Tuto: React.FC<TutoProps> = ({ step }) => {
    const content: { [key: number]: Content } = {
        1: {
            src: '/images/tuto0.webp',
            alt: '첫 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '',
        },
        2: {
            src: '/images/tuto1.webp',
            alt: '두 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '',
        },
        3: {
            src: '/images/tuto2.webp',
            alt: '세 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '',
        },
        4: {
            src: '/images/tuto3.webp',
            alt: '네 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '',
        },
        5: {
            src: '/images/tuto4.webp',
            alt: '다섯 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '',
        },
        // 필요한 만큼 추가
    };

    const { src, alt, text } = content[step];

    return (
        <div className="flex flex-col items-center justify-center h-full max-h-screen p-4 bg-white">
            <h1 className="text-center font-bold text-xl mt-12 mb-8">{text}</h1>
            <div className="flex justify-center items-center max-h-[60vh] w-full">
                <div className="relative w-[320px] h-[600px]">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        style={{ objectFit: 'contain' }} // objectFit을 스타일로 설정
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 반응형 이미지 크기 설정
                    />
                </div>
            </div>
        </div>
    );
};

export default Tuto;
