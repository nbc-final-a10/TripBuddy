'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function FollowHeartButton({
    followingId,
    followerId,
    onClick,
}: {
    followingId: string;
    followerId: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
    const pathname = usePathname();
    const [hasRank, setHasRank] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isOwnCard, setIsOwnCard] = useState<boolean>(false);

    useEffect(() => {
        // URL 경로에서 rank가 있는지 확인
        setHasRank(pathname.includes('rank'));
    }, [pathname]);

    useEffect(() => {
        // 기존 팔로우 여부 검사
        const checkFollowStatus: () => Promise<void> = async () => {
            const res = await fetch(
                `/api/buddyProfile/follow?followingId=${followingId}&followerId=${followerId}`,
            );
            const data = await res.json();
            setIsFollowing(data.originFollow.length > 0);
        };
        const checkOwnCard: () => void = () => {
            if (followingId === followerId) {
                setIsOwnCard(true);
            }
        };

        checkFollowStatus();
        checkOwnCard();
    }, [followingId, followerId]);

    const handleFollowToggle = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onClick(e);
        if (isFollowing) {
            await fetch(
                `/api/buddyProfile/follow?followingId=${followingId}&followerId=${followerId}`,
                { method: 'DELETE' },
            );
        } else {
            await fetch(`/api/buddyProfile/follow`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    followingId,
                    followerId,
                }),
            });
        }

        setIsFollowing(!isFollowing);
    };

    return (
        <>
            {hasRank && !isOwnCard && (
                <button
                    className="absolute top-0 right-0 text-xl mr-1 mt-1"
                    onClick={handleFollowToggle}
                >
                    <span className={isFollowing ? 'text-main-color' : ''}>
                        {isFollowing ? '♥' : '♡'}
                    </span>
                </button>
            )}
        </>
    );
}

export default FollowHeartButton;
