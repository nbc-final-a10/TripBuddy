import { FollowData } from '@/app/(providers)/(conditional)/profile/follow/[id]/page';
import { Buddy } from '@/types/Auth.types';
import React from 'react';

type FollowerListProps = {
    followerList: Buddy[];
};

function FollowerList({ followerList }: FollowerListProps) {
    return <div>팔로워 리스트</div>;
}

export default FollowerList;
