import Center2xlTwoLineText from '@/components/atoms/write/Cneter2xlTwoLineText';
import WelcomeImage from '@/components/molecules/write/WelcomeImage';
import React from 'react';

export default function FailPage() {
    return (
        <div>
            <Center2xlTwoLineText
                firstText="버디즈 모집 작성 글을"
                secondText="작성 실패했어요 :("
            />
            <div className="flex justify-center items-center mt-8 xl:mt-16">
                <WelcomeImage isGray={true} />
            </div>
        </div>
    );
}
