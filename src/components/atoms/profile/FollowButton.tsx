import { showAlert } from '@/utils/ui/openCustomAlert';
import { useAuth } from '@/hooks/auth';
import React from 'react';

export default function FollowButton() {
    const { buddy } = useAuth();
    const followingId = window.location.pathname.split('/').pop(); // URL에서 [id]를 가져옴

    const handleFollow = async () => {
        try {
            const response = await fetch('/api/buddyProfile/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    followingId,
                    followerId: buddy?.buddy_id, // followerId를 본문에 포함
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
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
