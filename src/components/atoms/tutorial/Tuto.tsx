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
            src: '/images/recruitmentImg1.webp',
            alt: '첫 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '같이 여행을 할 동료를 모집해보세요!',
        },
        2: {
            src: '/images/recruitmentImg2.webp',
            alt: '두 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '모집중인 여정을 확인해보세요!',
        },
        3: {
            src: '/images/searchImg1.webp',
            alt: '세 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '테마와 성향에 따른 검색기능',
        },
        4: {
            src: '/images/searchImg2.webp',
            alt: '네 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '위치기반 검색기능',
        },
        5: {
            src: '/images/chatImg.webp',
            alt: '다섯 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '같이 여행을 할 동료들과 채팅을 해보세요!',
        },
        6: {
            src: '/images/myProfile.webp',
            alt: '여섯 번째 튜토리얼 페이지에서 사용되는 이미지',
            text: '튜토리얼 6페이지',
        },
        // 필요한 만큼 추가
    };

    const { src, alt, text } = content[step];

    return (
        <div className="flex flex-col items-center justify-center h-full max-h-screen p-4">
            <h1 className="text-center font-bold text-xl mb-4">{text}</h1>
            <div className="flex justify-center items-center max-h-[60vh]">
                <Image
                    src={src}
                    alt={alt}
                    width={310}
                    height={390}
                    className="max-w-full max-h-full h-auto"
                />
            </div>
        </div>
    );
};

export default Tuto;
