import StoryDetail from '@/components/organisms/stories/StoryDetail';
import React from 'react';

type StoryPageProps = {
    params: { nickname: string };
    searchParams: { [key: string]: string | undefined };
};

const StoryPage: React.FC<StoryPageProps> = ({ params, searchParams }) => {
    const { nickname } = params;
    const { id } = searchParams;

    if (!id) {
        return <div>스토리 아이디가 없습니다.</div>;
    }

    return <StoryDetail nickname={nickname} id={id} />;
};

export default StoryPage;
