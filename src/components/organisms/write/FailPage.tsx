import MascotImage from '@/components/atoms/common/MascotImage';
import Center2xlTwoLineText from '@/components/atoms/write/Cneter2xlTwoLineText';
import React from 'react';

export default function FailPage() {
    return (
        <div className="relative mt-2">
            <Center2xlTwoLineText
                firstText="버디즈 모집 작성 글을"
                secondText="작성 실패했어요 :("
            />
            <div className="relative h-[350px] flex justify-center items-center">
                <div className="flex justify-center h-[230px] w-[300px] xl:h-[400px] xl:w-[400px] mx-auto">
                    <MascotImage
                        intent="main"
                        className="w-[70%] h-[70%] filter grayscale"
                    />
                </div>
            </div>
        </div>
    );
}
