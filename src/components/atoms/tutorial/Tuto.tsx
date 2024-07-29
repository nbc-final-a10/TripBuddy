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
            src: '/images/tuto1.webp',
            alt: '첫 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '튜토리얼 1페이지',
        },
        2: {
            src: '/images/tuto2.webp',
            alt: '두 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '튜토리얼 2페이지',
        },
        3: {
            src: '/images/tuto3.webp',
            alt: '세 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '튜토리얼 3페이지',
        },
        4: {
            src: '/images/tuto4.webp',
            alt: '네 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '튜토리얼 4페이지',
        },
        5: {
            src: '/images/tuto5.webp',
            alt: '다섯 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '튜토리얼 5페이지',
        },
        // 필요한 만큼 추가
    };

    const { src, alt, text } = content[step];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-center font-bold text-xl mb-4">{text}</h1>
            <div className="flex justify-center items-center">
                <Image src={src} alt={alt} width={300} height={300} />
            </div>
        </div>
    );
};

export default Tuto;
