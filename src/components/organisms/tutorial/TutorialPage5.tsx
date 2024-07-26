import React from 'react';
import Tuto5Image from '@/components/atoms/tutorial/Tuto5Image';
import Tuto5Text from '@/components/atoms/tutorial/Tuto5Text';

const titles = '다섯 번째 페이지의 제목';

const TutorialPage5 = () => {
    return (
        <div>
            <Tuto5Text title={titles} />
            <Tuto5Image />
        </div>
    );
};

export default TutorialPage5;
