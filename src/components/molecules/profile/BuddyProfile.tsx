import ProfileImage from '@/components/atoms/profile/ProfileImage';
import React from 'react';

export default function BuddyProfile() {
    return (
        <div className="flex flex-col items-center justify-center p-4 mt-4 xl:mt-8">
            <div className="flex items-center">
                <ProfileImage />
                <div className="ml-4">
                    <div className="flex flex-col ">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold xl:text-3xl">
                                김버디
                            </span>
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 ml-2">
                                ENFP
                            </span>
                        </div>
                        <p className="mt-2 text-gray-500">1997년생 / 여성</p>
                        <p className="text-gray-500">
                            맛집, 예쁜 카페 탐방 좋아해요~!
                        </p>
                        <p className="mt-2 text-gray-500">경기도 수원 거주</p>

                        <div className="mt-4">
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                힐링
                            </span>
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                핫플
                            </span>
                            <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                즉흥
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
