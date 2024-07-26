import Center2xlTwoLineText from '@/components/atoms/MyPage/Cneter2xlTwoLineText';
import WelcomeImage from '@/components/molecules/write/WelcomeImage';
import React from 'react';

export default function CompletePage() {
    return (
        <div>
            <Center2xlTwoLineText
                firstText="버디즈 모집 작성 글이"
                secondText="작성 완료되었어요!"
            />
            <div className="flex justify-center items-center mt-8 xl:mt-16">
                <WelcomeImage />
            </div>
        </div>
    );
}
