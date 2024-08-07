'use client';

import { showAlert } from '@/utils/ui/openCustomAlert';
import { useAuth } from '@/hooks/auth';
import React, { useEffect, useState } from 'react';
import { QUERY_KEY_BUDDY_PROFILE } from '@/constants/query.constants';
import { useQueryClient } from '@tanstack/react-query';

export default function FollowButton() {
    const { buddy } = useAuth();
    const followingId = window.location.pathname.split('/').pop();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const checkResponse = await fetch(
                    `/api/buddyProfile/follow?followingId=${followingId}&followerId=${buddy?.buddy_id}`,
                    {
                        method: 'GET',
                    },
                );

                if (checkResponse.status === 200) {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }
            } catch (error) {
                console.error('Error checking follow status:', error);
            }
        };

        checkFollowStatus();
    }, [buddy, followingId, queryClient]);

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
                    followingId,
                    followerId: buddy?.buddy_id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                showAlert('error', '팔로우 중 오류가 발생했습니다.');
                return;
            }

            const data = await response.json();
            console.log('follow data', data);

            showAlert('success', '팔로우 성공했습니다.');
            setIsFollowing(true);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_BUDDY_PROFILE, followingId],
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

            // const data = await response.json();

            showAlert('success', '팔로우가 취소되었습니다.');
            setIsFollowing(false);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_BUDDY_PROFILE, followingId],
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className={`text-sm text-gray-500 bg-gray-200 rounded-full px-4 py-1 mt-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} // 비활성화 스타일 추가
            onClick={isFollowing ? handleUnfollow : handleFollow}
            disabled={isLoading}
        >
            {isFollowing ? '팔로우 취소' : '팔로우 하기'}
        </button>
    );
}
