import React from 'react';
import Tuto2Image from '@/components/atoms/tutorial/Tuto2Image';
import Tuto2Text from '@/components/atoms/tutorial/Tuto2Text';

const titles = '두 번째 페이지의 제목';

const TutorialPage2 = () => {
    return (
        <div>
            <Tuto2Text title={titles} />
            <Tuto2Image />
        </div>
    );
};

export default TutorialPage2;
