import React from 'react';

type StoryPageProps = {
    params: { id: string };
};

const StoryPage: React.FC<StoryPageProps> = ({ params }) => {
    const { id } = params;

    // 스토리 아이디로 보내는 기능 만들고
    // 링크 타고 여기로 오면
    // id 를 기준으로 스토리 조회 하고
    // (유즈쿼리 두개로 나누고 : 스토리즈 / 스토리)
    // 라우트핸들러 만들고

    return <div>StoryPage</div>;
};

export default StoryPage;
