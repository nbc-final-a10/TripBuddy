'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import FollowingList from '@/components/molecules/profile/followList/FollowingList';
import FollowerList from '@/components/molecules/profile/followList/FollwerList';
import useFollowListToggle from '@/hooks/myPage/useFollowListToggle';
import { Follow } from '@/types/Follow.types';
import { fetchFollowData } from '@/api-services/auth/client';
import { useBuddyQuery } from '@/hooks/queries';
import { useFollowCountQuery } from '@/hooks/queries/buddy/useGetFollowCounts';

function FollowPage() {
    const { activeButton, FollowListToggleButton } = useFollowListToggle();
    const { id: clickedBuddyId } = useParams<{ id: string }>();
    const [followData, setFollowData] = useState<Follow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [followingList, setFollowingList] = useState<string[]>([]);
    const [followerList, setFollowerList] = useState<string[]>([]);

    const { data: followList, isLoading } = useFollowCountQuery(clickedBuddyId);

    useEffect(() => {
        if (!followList) return;

        const newFollowingList = followList
            .filter(data => data.follow_following_id === clickedBuddyId)
            .map(data => data.follow_follower_id);

        const newFollowerList = followList
            .filter(data => data.follow_follower_id === clickedBuddyId)
            .map(data => data.follow_following_id);

        setFollowingList(newFollowingList);
        setFollowerList(newFollowerList);
    }, [followList, clickedBuddyId]);

    console.log('followingList', followingList);
    console.log('followerList', followerList);

    if (isLoading) {
        return <DefaultLoader />;
    }

    return (
        <>
            <span>팔로우페이지</span>
            {/* <div className="flex justify-center mb-4">
                <FollowListToggleButton />
            </div>
            {activeButton === '팔로잉' && (
                <FollowingList followingList={followingList} />
            )}
            {activeButton === '팔로워' && (
                <FollowerList followerList={followerList} />
            )} */}
        </>
    );
}

export default FollowPage;