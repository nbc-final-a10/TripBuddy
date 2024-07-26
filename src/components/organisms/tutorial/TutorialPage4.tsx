import React from 'react';
import Tuto4Image from '@/components/atoms/tutorial/Tuto4Image';
import Tuto4Text from '@/components/atoms/tutorial/Tuto4Text';

const titles = '네 번째 페이지의 제목';

const TutorialPage4 = () => {
    return (
        <div>
            <Tuto4Text title={titles} />
            <Tuto4Image />
        </div>
    );
};

export default TutorialPage4;
