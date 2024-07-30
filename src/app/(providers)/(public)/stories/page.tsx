import StoryCard from '@/components/molecules/story/StoryCard';
import React from 'react';

const StoriesPage: React.FC = () => {
    return (
        <section className="flex flex-col gap-4">
            {Array.from({ length: 10 }, (_, index) => (
                <StoryCard key={index} />
            ))}
        </section>
    );
};

export default StoriesPage;
