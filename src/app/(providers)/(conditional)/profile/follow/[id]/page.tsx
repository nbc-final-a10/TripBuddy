'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import FollowingList from '@/components/molecules/profile/followList/FollowingList';
import FollowerList from '@/components/molecules/profile/followList/FollwerList';
import useFollowListToggle from '@/hooks/myPage/useFollowListToggle';
import { Buddy } from '@/types/Auth.types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export type FollowData = {
    follow_id: string;
    follow_following_id: string;
    follow_follower_id: string;
};

// export type Buddy = {
//     buddy_id: string;
//     buddy_nickname: string;
//     buddy_profile_pic: string | null;
//     buddy_temperature: number;
//     // 필요한 다른 속성들 추가
// };

function FollowPage() {
    const { activeButton, FollowListToggleButton } = useFollowListToggle();
    const { id: clickedBuddyId } = useParams<{ id: string }>();
    const [followData, setFollowData] = useState<FollowData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [followingList, setFollowingList] = useState<Buddy[]>([]);
    const [followerList, setFollowerList] = useState<Buddy[]>([]);

    useEffect(() => {
        const fetchFollowingData = async () => {
            try {
                const res = await fetch(
                    `/api/buddyProfile/follow/followList?current_buddy_id=${clickedBuddyId}`,
                );
                const data = await res.json();

                if (res.ok) {
                    setFollowData(data.originFollow as FollowData[]);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error(
                    '팔로잉 데이터를 가져오는 중 오류가 발생했습니다:',
                    error,
                );
            } finally {
                setLoading(false);
            }
        };

        if (clickedBuddyId) {
            fetchFollowingData();
        }
    }, [clickedBuddyId]);

    useEffect(() => {
        const fetchBuddyData = async (
            buddyId: string,
        ): Promise<Buddy | null> => {
            try {
                const res = await fetch(
                    `/api/buddyProfile/buddy?id=${buddyId}`,
                );
                if (res.ok) {
                    return res.json();
                } else {
                    console.error(
                        `Failed to fetch data for buddy id: ${buddyId}`,
                    );
                    return null;
                }
            } catch (error) {
                console.error(
                    `Error fetching data for buddy id: ${buddyId}`,
                    error,
                );
                return null;
            }
        };

        const loadBuddyData = async () => {
            const newFollowingList = await Promise.all(
                followData
                    .filter(data => data.follow_following_id === clickedBuddyId)
                    .map(data => fetchBuddyData(data.follow_follower_id)),
            );

            const newFollowerList = await Promise.all(
                followData
                    .filter(data => data.follow_follower_id === clickedBuddyId)
                    .map(data => fetchBuddyData(data.follow_following_id)),
            );

            setFollowingList(
                newFollowingList.filter(buddy => buddy !== null) as Buddy[],
            );
            setFollowerList(
                newFollowerList.filter(buddy => buddy !== null) as Buddy[],
            );
        };

        if (followData.length > 0) {
            loadBuddyData();
        }
    }, [followData, clickedBuddyId]);

    console.log('followingList', followingList);
    console.log('followerList', followerList);

    if (loading) {
        return <DefaultLoader />;
    }

    return (
        <>
            <div className="flex justify-center mb-4">
                <FollowListToggleButton />
            </div>
            {activeButton === '팔로잉' && (
                <FollowingList followingList={followingList} />
            )}
            {activeButton === '팔로워' && (
                <FollowerList followerList={followerList} />
            )}
        </>
    );
}

export default FollowPage;
