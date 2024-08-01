'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import { Buddy } from '@/types/Auth.types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const RankPage: React.FC = () => {
    const [buddies, setBuddies] = useState<Buddy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuddies = async () => {
            try {
                const response = await fetch(
                    '/api/buddyProfile/buddiesRecommendationList',
                );
                const data = await response.json();
                console.log(data);
                setBuddies(data.buddies);
                setLoading(false);
            } catch (error) {
                console.error('버디 추천 리스트 통신 오류 발생:', error);
            }
        };
        fetchBuddies();
    }, []);

    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        버디즈 랭킹 TOP 10
                    </h1>
                    <span className="text-xs">
                        TripBuddy 온도지수 TOP 10 버디즈를 소개합니다!
                    </span>
                </div>
            </div>

            <div>
                {buddies.map((buddy, index) => (
                    <div key={index}>
                        <span className="text-black text-2xl font-bold">
                            랭킹 {index + 1}위
                        </span>
                        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-6">
                            <Image
                                src={buddy?.buddy_profile_pic || ''}
                                alt={buddy?.buddy_nickname}
                                width={100}
                                height={100}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                            <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                                {buddy?.buddy_nickname}
                            </h3>
                            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                {buddy?.buddy_introduction}
                            </div>
                            <div className="flex justify-end">
                                <BuddyTemperature
                                    temperature={buddy?.buddy_temperature}
                                />
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RankPage;
