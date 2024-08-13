'use client';

import MascotImage from '@/components/atoms/common/MascotImage';
import Center2xlTwoLineText from '@/components/atoms/write/Center2xlTwoLineText';
import React from 'react';

export default function PendingPage() {
    return (
        <div className="relative mt-2">
            <div className="fixed flex items-center justify-center h-dvh w-dvw top-0 left-0 z-50" />
            <Center2xlTwoLineText
                firstText="버디가 열심히 글을"
                secondText="작성하고 있어요!"
            />
            <div className="relative h-[350px] flex justify-center items-center">
                <div className="flex justify-center h-[230px] w-[300px] xl:h-[400px] xl:w-[400px] mx-auto">
                    <MascotImage intent="main" className="w-[70%] h-[70%]" />
                </div>
            </div>
        </div>
    );
}
