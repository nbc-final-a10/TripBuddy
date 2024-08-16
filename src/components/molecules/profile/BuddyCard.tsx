'use client';

import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import Image from 'next/image';
import { Buddy } from '@/types/Auth.types';
import MascotImage from '@/components/atoms/common/MascotImage';
import { getAgeFromBirthDate } from '@/utils/common/getAgeFromBirthDate';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';
import FollowHeartButton from '@/components/organisms/profile/FollowHeartButton';

type FollowBuddies = {
    buddy_id: string;
    buddy_nickname: string;
    buddy_profile_pic: string;
    buddy_birth: string;
    buddy_temperature: number;
    buddy_preferred_buddy1: string;
    buddy_preferred_buddy2: string;
    buddy_preferred_buddy3: string;
    buddy_sex: string;
    buddy_region: string;
    buddy_introduction: string;
    buddy_preferred_theme1: string;
    buddy_preferred_theme2: string;
    buddy_preferred_theme3: string;
    buddy_mbti: string;
};

// 더미 데이터를 컴포넌트 내에서 정의
const dummyBuddies: FollowBuddies[] = [
    {
        buddy_id: '1',
        buddy_nickname: 'JohnDoe',
        buddy_profile_pic: '/images/mascot_main.webp',
        buddy_birth: '1990-01-01',
        buddy_temperature: 36.5,
        buddy_mbti: 'INTJ',
        buddy_sex: 'M',
        buddy_region: 'Seoul',
        buddy_introduction: '안녕하세요, JohnDoe입니다.',
        buddy_preferred_theme1: '여행',
        buddy_preferred_theme2: '음악',
        buddy_preferred_theme3: '스포츠',
        buddy_preferred_buddy1: '친절한',
        buddy_preferred_buddy2: '웃긴',
        buddy_preferred_buddy3: '상냥한',
    },
    // 다른 더미 버디 데이터 추가
];

function BuddyCard() {
    const { buddy: currentBuddy } = useAuth();
    const router = useRouter();
    const [buddies, setBuddies] = useState<FollowBuddies[]>([]);

    // 더미 데이터를 설정하는 useEffect
    useEffect(() => {
        // 여기서 실제 데이터를 가져오거나 더미 데이터를 설정할 수 있습니다.
        setBuddies(dummyBuddies); // 실제 API 호출을 통해 데이터를 가져올 수 있습니다.
    }, []);
    console.log('buddies', buddies);

    const handleCardClick = (buddyId: string) => {
        router.push(`/profile/${buddyId}`);
    };

    return (
        <>
            {buddies.map((buddy: FollowBuddies, index: number) => (
                <div
                    key={index}
                    className={`relative h-[75px] px-2 mx-1 rounded border border-gray-200 cursor-pointer flex items-center`}
                    onClick={() => handleCardClick(buddy.buddy_id)}
                >
                    <div className="flex items-center justify-center w-full h-full relative">
                        <div className="flex-shrink-0 w-[75px] h-[75px] flex items-center justify-center">
                            {buddy.buddy_profile_pic ? (
                                <Image
                                    src={buddy.buddy_profile_pic}
                                    alt="profile"
                                    width={60}
                                    height={60}
                                    className="rounded-lg w-[60px] h-[60px]"
                                />
                            ) : (
                                <MascotImage intent="happy" />
                            )}
                        </div>
                        <div className="mx-1 flex flex-col w-full relative">
                            <span className="text-xs font-bold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                                {buddy.buddy_preferred_buddy1 &&
                                buddy.buddy_preferred_buddy2
                                    ? `#${buddy.buddy_preferred_buddy1} #${buddy.buddy_preferred_buddy2}`
                                    : '#태그없음'}
                            </span>
                            <div className="text-m font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                <span className="block truncate">
                                    {buddy.buddy_nickname}
                                    {typeof buddy.buddy_birth === 'string'
                                        ? ` / ${getAgeFromBirthDate(
                                              buddy.buddy_birth,
                                          )} 세`
                                        : null}
                                </span>
                            </div>

                            <div className="w-full flex justify-between items-center">
                                <BuddyTemperature
                                    isLabel={false}
                                    isTempText={false}
                                    temperature={buddy.buddy_temperature}
                                />
                            </div>
                        </div>
                    </div>

                    <FollowHeartButton
                        followingId={buddy.buddy_id}
                        followerId={currentBuddy?.buddy_id || ''}
                        onClick={e => e.stopPropagation()} // 하트 버튼 이벤트 버블링 막기
                    />
                </div>
            ))}
        </>
    );
}

export default BuddyCard;
