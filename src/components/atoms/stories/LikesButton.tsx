'use client';

import { useAuth } from '@/hooks/auth';
import useStoryLikesMutation from '@/hooks/queries/useStoryLikesMutation';
import useStoryLikesQuery from '@/hooks/queries/useStoryLikesQuery';
import { StoryLikes } from '@/types/Story.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

type LikesButtonProps = {
    story_id: string;
    likes: StoryLikes[];
};

const LikesButton: React.FC<LikesButtonProps> = ({ story_id, likes }) => {
    const { buddy } = useAuth();
    const router = useRouter();
    const { mutate: likesMutate, isPending: isPosting } =
        useStoryLikesMutation(story_id);

    const [isLiked, setIsLiked] = useState(false);

    const handleClick = () => {
        if (!buddy) {
            showAlert('caution', '로그인이 필요합니다.', {
                onConfirm: () => router.push('/login'),
            });
        }
        if (isLiked && buddy) {
            likesMutate({
                buddy_id: buddy.buddy_id,
                isLiked: false,
                story_id: story_id,
            });
        } else if (buddy) {
            likesMutate({
                buddy_id: buddy.buddy_id,
                isLiked: true,
                story_id: story_id,
            });
        }
    };

    useEffect(() => {
        if (likes && buddy) {
            const isLiked = likes.find(
                like => like.storylikes_buddy_id === buddy.buddy_id,
            );
            setIsLiked(isLiked ? true : false);
        }
    }, [likes, buddy]);

    return (
        <div className="flex flex-row items-center gap-1">
            {isLiked ? (
                <FaHeart
                    className="cursor-pointer fill-white"
                    onClick={handleClick}
                />
            ) : (
                <FaRegHeart
                    className="cursor-pointer fill-white"
                    onClick={handleClick}
                />
            )}
            <span className="text-md text-white">
                {likes?.length.toLocaleString()}
            </span>
        </div>
    );
};

export default LikesButton;
