'use client';

import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { useEffect, useState } from 'react';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks';

export default function FollowButton() {
    const { buddy } = useAuth();
    const [followingId, setFollowingId] = useState<string | undefined>('');
    const [followerId, setFollowerId] = useState<string | undefined>('');
    const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        const getCurrentBuddyId = buddy?.buddy_id;
        setFollowerId(getCurrentBuddyId);

        const fetchTripMasterId = async () => {
            try {
                const urlTripId = window.location.pathname.split('/').pop();
                const tripMasterIdResponse = await fetch(
                    `/api/contract/trip/masterId?trip_id=${urlTripId}`,
                    {
                        method: 'GET',
                    },
                );

                if (!tripMasterIdResponse.ok) {
                    throw new Error(
                        `Error fetching trip master ID: ${tripMasterIdResponse.statusText}`,
                    );
                }

                const tripMasterData = await tripMasterIdResponse.json();
                console.log('tripMasterData', tripMasterData);
                return tripMasterData.trip_master_id;
            } catch (error) {
                console.error('Error fetching trip master ID:', error);
                return null;
            }
        };

        const checkFollowStatus = async (
            followingId: string,
            followerId: string,
        ) => {
            try {
                const checkResponse = await fetch(
                    `/api/buddyProfile/follow?followingId=${followingId}&followerId=${followerId}`,
                    {
                        method: 'GET',
                    },
                );

                if (checkResponse.ok) {
                    const data = await checkResponse.json();
                    setIsFollowing(data.originFollow.length > 0);
                    console.log('팔로우 상태', data);
                } else {
                    throw new Error(
                        `Error checking follow status: ${checkResponse.statusText}`,
                    );
                }
            } catch (error) {
                console.error('Error checking follow status:', error);
            }
        };

        const handleTripsLogic = async () => {
            const tripMasterId = await fetchTripMasterId();
            if (tripMasterId) {
                setFollowingId(tripMasterId);
                await checkFollowStatus(tripMasterId, getCurrentBuddyId || '');
            }
        };

        const handleProfileLogic = async () => {
            const urlBuddyId = window.location.pathname.split('/').pop();
            setFollowingId(urlBuddyId || '');
            await checkFollowStatus(urlBuddyId || '', getCurrentBuddyId || '');
        };

        if (window.location.pathname.includes('trips')) {
            handleTripsLogic();
        } else if (window.location.pathname.includes('profile')) {
            handleProfileLogic();
        }
    }, [buddy]);

    const handleFollow = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetch('/api/buddyProfile/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followingId: followingId,
                    followerId: followerId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                showAlert('error', errorData.message);
                return;
            }

            const data = await response.json();

            showAlert('success', '팔로우 성공했습니다.');
            setIsFollowing(true);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_BUDDY, followingId],
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnfollow = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/buddyProfile/follow?followingId=${followingId}&followerId=${buddy?.buddy_id}`,
                {
                    method: 'DELETE',
                },
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                showAlert('error', '팔로우 취소 중 오류가 발생했습니다.');
                return;
            }

            showAlert('success', '팔로우가 취소되었습니다.');
            setIsFollowing(false);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_BUDDY, followingId],
            });
        } finally {
            setIsLoading(false);
        }
    };

    console.log('isFollowing', isFollowing);

    return isFollowing === null ? (
        <div className="text-sm bg-gray-200 rounded-full px-4 py-1 mt-10 animate-pulse h-8 w-32"></div>
    ) : (
        <button
            className={`text-sm text-gray-500 bg-gray-200 rounded-full px-4 py-1 mt-10 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={isFollowing ? handleUnfollow : handleFollow}
            disabled={isLoading}
        >
            {isFollowing ? '팔로우 취소' : '팔로우 하기'}
        </button>
    );
}
