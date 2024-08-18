'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DefaultLoader from '@/components/atoms/common/DefaultLoader';
import FollowingList from '@/components/molecules/profile/followList/FollowingList';
import FollowerList from '@/components/molecules/profile/followList/FollowerList';
import useFollowListToggle from '@/hooks/MyPage/useFollowListToggle';
import { useFollowCountQuery } from '@/hooks/queries';

function FollowPage() {
    const { activeButton, FollowListToggleButton } = useFollowListToggle();
    const { id: clickedBuddyId } = useParams<{ id: string }>();
    const [followingList, setFollowingList] = useState<string[]>([]);
    const [followerList, setFollowerList] = useState<string[]>([]);

    const { data: followList, isLoading } = useFollowCountQuery(clickedBuddyId);

    useEffect(() => {
        if (!followList) return;

        const newFollowerList = followList
            .filter(data => data.follow_following_id === clickedBuddyId)
            .map(data => data.follow_follower_id);

        const newFollowingList = followList
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
            <div className="flex justify-center mb-4">
                <FollowListToggleButton />
            </div>
            {activeButton === '팔로잉' && (
                <FollowingList
                    followingList={followingList}
                    activeButton={activeButton}
                />
            )}
            {activeButton === '팔로워' && (
                <FollowerList
                    followerList={followerList}
                    activeButton={activeButton}
                />
            )}
        </>
    );
}

export default FollowPage;
