import React from 'react';
import Tuto1Image from '@/components/atoms/tutorial/Tuto1Image';
import Tuto1Text from '@/components/atoms/tutorial/Tuto1Text';

const titles = '첫 번째 페이지의 제목';

const TutorialPage1 = () => {
    return (
        <div>
            <Tuto1Text title={titles} />
            <Tuto1Image />
        </div>
    );
};

export default TutorialPage1;
