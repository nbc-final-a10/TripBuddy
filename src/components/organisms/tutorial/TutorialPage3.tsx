import React from 'react';
import Tuto3Image from '@/components/atoms/tutorial/Tuto3Image';
import Tuto3Text from '@/components/atoms/tutorial/Tuto3Text';

const titles = '세 번째 페이지의 제목';

const TutorialPage3 = () => {
    return (
        <div>
            <Tuto3Text title={titles} />
            <Tuto3Image />
        </div>
    );
};

export default TutorialPage3;
