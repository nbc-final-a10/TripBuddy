'use client';

import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { useEffect, useState } from 'react';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks';

export default function FollowButton() {
    const { buddy } = useAuth();
    const [followingId, setFollowingId] = useState<string | undefined>('');
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        const checkFollowStatus = async () => {
            try {
                const followingId = window.location.pathname.split('/').pop();

                setFollowingId(followingId);
                const followerId = buddy?.buddy_id;
                const checkResponse = await fetch(
                    `/api/buddyProfile/follow?followingId=${followingId}&followerId=${followerId}`,
                    {
                        method: 'GET',
                    },
                );

                // APU 응답의 컨텐츠 유형을 파악. 현재 안 쓰여서 잠시 주석 처리.
                // const contentType =
                //     checkResponse.headers.get('content-type') || '';
                const data = await checkResponse.json();
                if (data.originFollow) {
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
            // console.log('follow data', data);

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

            // const data = await response.json();

            showAlert('success', '팔로우가 취소었습니다.');
            setIsFollowing(false);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_BUDDY, followingId],
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
