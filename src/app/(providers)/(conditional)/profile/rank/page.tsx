'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import { Buddy } from '@/types/Auth.types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const medalIcons = ['/public/gif/medal.gif'];

const Skeleton: React.FC = () => {
    return (
        <div className="bg-gray-100 rounded-lg p-4 relative animate-pulse">
            <div className="relative rounded-lg overflow-hidden h-48 bg-gray-300"></div>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-gray-300 bg-gray-300 rounded w-1/3 h-6"></span>
                <div className="bg-gray-300 rounded w-1/4 h-6"></div>
            </div>
        </div>
    );
};

const RankPage: React.FC = () => {
    const [buddies, setBuddies] = useState<Buddy[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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
                setLoading(false);
            }
        };
        fetchBuddies();
    }, []);

    return (
        <div className="p-8 rounded-md w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-6">
                <div>
                    <h1 className="text-4xl font-semibold text-gray-900">
                        버디즈 랭킹 TOP 10
                    </h1>
                    <span className="text-md text-gray-600">
                        TripBuddy 온도지수 TOP 10 버디즈를 소개합니다!
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : buddies.map((buddy, index) => (
                          <div
                              key={index}
                              className="bg-gray-100 rounded-lg p-4 relative transform transition-transform duration-200 hover:-translate-y-2 cursor-pointer"
                              onClick={() => {
                                  router.push(`/profile/${buddy.buddy_id}`);
                              }}
                          >
                              <div className="relative rounded-lg overflow-hidden">
                                  <div className="relative w-full h-48">
                                      <Image
                                          src={
                                              buddy?.buddy_profile_pic ||
                                              '/default-profile.png'
                                          }
                                          alt={buddy?.buddy_nickname}
                                          layout="fill"
                                          objectFit="cover"
                                          className="rounded-t-lg"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
                                      <div className="absolute bottom-0 left-0 p-4 text-white">
                                          <h3 className="text-2xl font-bold">
                                              {buddy?.buddy_nickname}
                                          </h3>
                                          <p className="text-sm">
                                              {buddy?.buddy_introduction}
                                          </p>
                                      </div>
                                      {index < 3 && (
                                          <div className="absolute top-4 right-4">
                                              <Image
                                                  // Todo: 금은동 메달 배열에 들어가고 나면 사용
                                                  // src={medalIcons[index]}
                                                  src={'/icon/medal.png'}
                                                  alt={`${index + 1}위 메달`}
                                                  width={40}
                                                  height={40}
                                              />
                                          </div>
                                      )}
                                  </div>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                  <span className="text-xl font-bold text-gray-800 whitespace-nowrap mr-2">
                                      {index + 1}위
                                  </span>
                                  <BuddyTemperature
                                      temperature={buddy?.buddy_temperature}
                                  />
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default RankPage;
