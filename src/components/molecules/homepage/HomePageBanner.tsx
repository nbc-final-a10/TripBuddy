import React from 'react';
import Image from 'next/image';

const HomePageBanner: React.FC = () => {
    const bannerImgs = [
        '/images/home_banner1/webp',
        '/images/home_banner2/webp',
        '/images/home_banner3/webp',
    ];
    const randomImg = bannerImgs[Math.floor(Math.random() * bannerImgs.length)];

    return (
        <div className="text-left text-white font-semibold text-2xl px-4 py-8 h-[200px] flex flex-col justify-end bg-[url('/images/home_banner1.webp')] bg-cover bg-center">
            <p>
                <span className="font-bold text-3xl">여행자</span>님,
            </p>
            <p>예정된 대만 여행이</p>
            <p>
                <span className="font-bold text-3xl">3일</span> 남았어요!
            </p>
        </div>
    );
};

export default HomePageBanner;
