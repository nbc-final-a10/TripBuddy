// import Chip from '@/components/atoms/common/O_Chip';
// import StoryCard from '@/components/molecules/stories/StoryCard';
import DraggableText from '@/components/organisms/stories/DraggableInput';
import React from 'react';

const StoriesPage: React.FC = () => {
    return (
        <section className="flex flex-col gap-4">
            {/* {Array.from({ length: 10 }, (_, index) => (
                <StoryCard
                    key={index}
                    name="김소희"
                    created_at="2024-07-26"
                    profile_image="/images/test.webp"
                    background_image="/images/test2.webp"
                    mode="my"
                />
            ))} */}

            <DraggableText />
        </section>
    );
};

export default StoriesPage;
