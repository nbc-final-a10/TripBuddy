'use client';

import Center2xlTwoLineText from '@/components/atoms/write/Cneter2xlTwoLineText';
import WelcomeImage from '@/components/molecules/write/WelcomeImage';
import React from 'react';

export default function PendingPage() {
    return (
        <>
            <div className="fixed flex items-center justify-center h-dvh w-dvw top-0 left-0 z-50" />
            <Center2xlTwoLineText
                firstText="버디가 열심히 글을"
                secondText="작성하고 있어요!"
            />
            <div className="flex justify-center items-center mt-8 xl:mt-16">
                <WelcomeImage />
            </div>
        </>
    );
}
