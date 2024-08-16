import HomePageRecommendBuddiesList from '@/components/organisms/homepage/HomePageRecommendBuddiesList';
import { Buddy } from '@/types/Auth.types';
import React from 'react';
import BuddyCard from '../BuddyCard';

type FollowingListProps = {
    clickedBuddyId: string;
};

const Skeleton: React.FC = () => {
    return (
        <div className="min-w-[200px] h-[75px] mx-1 rounded border border-gray-200 flex items-center p-2 animate-pulse mb-4">
            <div className="flex-shrink-0 w-[75px] h-[75px] bg-gray-300 rounded-lg"></div>
            <div className="mx-1 flex flex-col w-full">
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
        </div>
    );
};

function FollowingList({ clickedBuddyId }: FollowingListProps) {
    return (
        <div className="mb-4">
            <BuddyCard />
        </div>
    );
}

export default FollowingList;
