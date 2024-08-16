import React from 'react';
import BuddyCard from '../FollowBuddyCard';

type FollowerListProps = {
    followerList: string[];
};

function FollowerList({ followerList }: FollowerListProps) {
    return (
        <div className="mb-4">
            <BuddyCard followList={followerList} />
        </div>
    );
}

export default FollowerList;
