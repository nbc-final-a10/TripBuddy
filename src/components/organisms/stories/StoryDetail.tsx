'use client';

import useStoryQuery from '@/hooks/queries/useStoryQuery';
import React from 'react';

type StoryDetailProps = {
    id: string;
};

const StoryDetail: React.FC<StoryDetailProps> = ({ id }) => {
    const { data: story, isPending, error: storyError } = useStoryQuery(id);

    console.log(story);

    if (isPending) return <div>Loading...</div>;
    if (storyError) return <div>Error: {storyError.message}</div>;

    return <div>StoryDetail</div>;
};

export default StoryDetail;
