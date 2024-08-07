import { showAlert } from '@/utils/ui/openCustomAlert';
import { useAuth } from '@/hooks/auth';
import React from 'react';

export default function FollowButton() {
    const { buddy } = useAuth();
    const followingId = window.location.pathname.split('/').pop(); // URL에서 [id]를 가져옴

    const handleFollow = async () => {
        try {
            // 팔로우 중복 여부 확인
            const checkResponse = await fetch(
                `/api/buddyProfile/follow?followingId=${followingId}&followerId=${buddy?.buddy_id}`,
                {
                    method: 'GET',
                },
            );

            if (checkResponse.status === 200) {
                // 이미 팔로우 중인 경우 경고 표시
                showAlert('error', '이미 팔로우 하셨습니다.');
                return;
            }

            // 팔로우 중이 아닌 경우 POST 요청
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
        } catch (error) {
            console.error('Fetch error:', error);
            showAlert('error', '팔로우 중 오류가 발생했습니다.');
        }
    };

    return (
        <button
            className="text-sm text-gray-500 bg-gray-200 rounded-full px-4 py-1 mt-10"
            onClick={handleFollow}
        >
            팔로우 하기
        </button>
    );
}
