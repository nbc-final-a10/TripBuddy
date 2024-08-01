import Loading from '@/app/(providers)/loading';
import useStoriesQuery from '@/hooks/queries/useStoriesQuery';
import StoryCard from '../stories/StoryCard';
import { useAuth } from '@/hooks/auth';

const HomePageStories = () => {
    // const stories = Array.from(
    //     { length: 5 },
    //     (_, index) => `스토리 ${index + 1}`,
    // );
    const { buddy } = useAuth();

    const { data: stories, isPending, error: storyError } = useStoriesQuery();

    if (storyError) return <div>Error</div>;
    if (isPending) return <Loading />;

    return (
        <>
            {stories?.map(story => (
                <StoryCard
                    key={story.story_id}
                    id={story.story_id}
                    name={story.buddies.buddy_nickname}
                    created_at={story.story_created_at}
                    profile_image={
                        story.buddies.buddy_profile_pic || '/images/test.webp' // 추후변경요망
                    }
                    background_image={story.story_media}
                    mode={
                        buddy?.buddy_id === story.buddies.buddy_id
                            ? 'my'
                            : 'story'
                    }
                />
            ))}
        </>
    );
};

export default HomePageStories;
