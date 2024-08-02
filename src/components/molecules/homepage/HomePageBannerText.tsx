'use client';
import { useAuth } from '@/hooks/auth';
import React from 'react';

const HomePageBannerText: React.FC = () => {
    const { buddy } = useAuth();

    if (!buddy)
        return (
            <div className="relative z-20 text-white h-full flex flex-col justify-center gap-3">
                <p className="font-bold text-3xl">트립버디즈와</p>
                <p>즐거운 여정을</p>
                <p className="font-bold text-3xl">시작해보세요!</p>
            </div>
        );

    return (
        <div className="relative z-20 text-white h-full flex flex-col justify-center gap-3">
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

export default HomePageBannerText;
