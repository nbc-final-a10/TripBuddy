import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function useFollowListToggle() {
    const [activeButton, setActiveButton] = useState('팔로잉');
    const searchParams = useSearchParams();

    useEffect(() => {
        const view = searchParams.get('view');
        if (view === 'follower') {
            setActiveButton('팔로워');
        } else if (view === 'following') {
            setActiveButton('팔로잉');
        }
    }, [searchParams, setActiveButton]);
    const handleClick = (button: string) => {
        setActiveButton(button);
    };

    const FollowListToggleButton = () => {
        return (
            <div className="flex justify-center mb-4">
                <div className="w-full">
                    <button
                        className={`text-4xl px-4 py-2 ${activeButton === '팔로잉' ? 'border-b-2 border-main-color' : ''}`}
                        onClick={() => setActiveButton('팔로잉')}
                    >
                        팔로잉
                    </button>
                    <button
                        className={`text-4xl px-4 py-2 ${activeButton === '팔로워' ? 'border-b-2 border-main-color' : ''}`}
                        onClick={() => setActiveButton('팔로워')}
                    >
                        팔로워
                    </button>
                </div>
            </div>
        );
    };

    return {
        activeButton,
        setActiveButton,
        handleClick,
        FollowListToggleButton,
    };
}
