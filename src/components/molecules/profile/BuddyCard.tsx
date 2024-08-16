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
    followList: string[];
}

const BuddyCardSkeleton: React.FC = () => {
    return (
        <div className="min-w-[200px] h-[75px] mx-1 rounded border border-gray-200 flex items-center p-2 animate-pulse mb-4">
            <div className="flex-shrink-0 w-[65px] h-[65px] bg-gray-300 rounded-lg"></div>
            <div className="mx-1 flex flex-col w-full">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-4/4"></div>
            </div>
        </div>
    );
};

function BuddyCard({ followList }: BuddyCardProps) {
    const { buddy: currentBuddy } = useAuth();
    const router = useRouter();
    const [buddies, setBuddies] = useState<Buddy[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBuddies = async () => {
            try {
                setIsLoading(true);
                const fetchedBuddies = await Promise.all(
                    followList.map(async id => {
                        try {
                            const response = await fetch(
                                `/api/buddyProfile/buddy?id=${id}`,
                            );
                            if (!response.ok) {
                                throw new Error(
                                    '버디 정보를 불러오는 데 실패했습니다.',
                                );
                            }
                            return response.json();
                        } catch (error) {
                            console.error('에러가 발생했습니다.:', error);
                            return null;
                        }
                    }),
                );
                setBuddies(fetchedBuddies.filter(buddy => buddy !== null));
            } catch (error) {
                console.error('에러가 발생했습니다.', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBuddies();
    }, [followList]);

    const handleCardClick = (buddyId: string) => {
        router.push(`/profile/${buddyId}`);
    };

    return (
        <>
            {isLoading ? (
                <>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <BuddyCardSkeleton key={index} />
                    ))}
                </>
            ) : (
                buddies.map((buddy: Buddy, index: number) => (
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
                                            ? ` / ${getAgeFromBirthDate(buddy.buddy_birth)} 세`
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
                ))
            )}
        </>
    );
}

export default BuddyCard;
