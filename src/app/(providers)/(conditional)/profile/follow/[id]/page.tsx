'use client';

import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import FollowingList from '@/components/molecules/profile/followList/FollowingList';
import FollowerList from '@/components/molecules/profile/followList/FollwerList';
import useFollowListToggle from '@/hooks/myPage/useFollowListToggle';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type FollowData = {
    follow_following_id: string;
    follow_follower_id: string;
};

function FollowPage() {
    const { activeButton, FollowListToggleButton } = useFollowListToggle();
    const { id: clickedBuddyId } = useParams<{ id: string }>();
    const [followData, setFollowData] = useState<FollowData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [followingList, setFollowingList] = useState<FollowData[]>([]);
    const [followerList, setFollowerList] = useState<FollowData[]>([]);

    useEffect(() => {
        const fetchFollowingData = async () => {
            try {
                const res = await fetch(
                    `/api/buddyProfile/follow/followList?current_buddy_id=${clickedBuddyId}`,
                );
                const data = await res.json();

                if (res.ok) {
                    setFollowData(data.originFollow);
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
        const newFollowingList = followData.filter(
            data => data.follow_following_id === clickedBuddyId,
        );
        const newFollowerList = followData.filter(
            data => data.follow_follower_id === clickedBuddyId,
        );
        setFollowingList(newFollowingList);
        setFollowerList(newFollowerList);
    }, [followData, clickedBuddyId]);

    if (loading) {
        return <DefaultLoader />;
    }

    return (
        <>
            <div className="flex justify-center mb-4">
                <FollowListToggleButton />
            </div>
            {activeButton === '팔로잉' && (
                <FollowingList clickedBuddyId={clickedBuddyId} />
            )}
            {activeButton === '팔로워' && (
                <FollowerList clickedBuddyId={clickedBuddyId} />
            )}
        </>
    );
}

export default FollowPage;
