import React from 'react';
import Tuto1Text from '@/components/atoms/tutorial/Tuto1Text';
import Tuto1Image from '@/components/atoms/tutorial/Tuto1Image';
import Tuto2Image from '@/components/atoms/tutorial/Tuto2Image';
import Tuto2Text from '@/components/atoms/tutorial/Tuto2Text';

const tutorial = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <Tuto1Text />
            <Tuto1Image />
            <Tuto2Text />
            <Tuto2Image />
        </div>
    );
};

export default tutorial;
