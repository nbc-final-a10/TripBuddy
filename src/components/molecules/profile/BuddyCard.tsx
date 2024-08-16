import React, { useEffect, useState } from 'react';
import BuddyTemperature from '@/components/atoms/profile/BuddyTemperature';
import Image from 'next/image';
import { Buddy } from '@/types/Auth.types';
import MascotImage from '@/components/atoms/common/MascotImage';
import { getAgeFromBirthDate } from '@/utils/common/getAgeFromBirthDate';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import FollowHeartButton from '@/components/organisms/profile/FollowHeartButton';

interface BuddyCardProps {
    followList: Buddy[];
}

function BuddyCard({ followList }: BuddyCardProps) {
    const { buddy: currentBuddy } = useAuth();
    const router = useRouter();
    const [buddies, setBuddies] = useState<Buddy[]>([]);

    useEffect(() => {
        setBuddies(followList);
    }, [followList]);

    const handleCardClick = (buddyId: string) => {
        router.push(`/profile/${buddyId}`);
    };

    return (
        <>
            {buddies.map((buddy: Buddy, index: number) => (
                <div
                    key={index}
                    className={`relative h-[75px] px-2 mx-1 mb-4 rounded border border-gray-200 cursor-pointer flex items-center`}
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