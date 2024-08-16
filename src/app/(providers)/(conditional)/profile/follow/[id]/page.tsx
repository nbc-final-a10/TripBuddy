'use client';

import FollowingList from '@/components/molecules/profile/followList/FollowingList';
import FollowerList from '@/components/molecules/profile/followList/FollwerList';
import { useAuth } from '@/hooks';
import useFollowListToggle from '@/hooks/myPage/useFollowListToggle';
import { useHomeQueries } from '@/hooks/queries';
import { useParams } from 'next/navigation';
import { useState } from 'react';

function FollowPage() {
    const { activeButton, FollowListToggleButton } = useFollowListToggle();
    // const { buddy } = useAuth();
    // const { id } = useParams();
    // const currentBuddyId = buddy?.buddy_id;
    // const [loading, setLoading] = useState(false);
    // const queries = useHomeQueries();

    // const buddies = queries.data?.buddies || [];
    console.log('activeButton', activeButton);

    return (
        <>
            <div className="flex justify-center mb-4">
                <FollowListToggleButton />
            </div>
            {activeButton === '팔로잉' && <FollowingList />}
            {activeButton === '팔로워' && <FollowerList />}
        </>
    );
}

export default FollowPage;
