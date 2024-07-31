import Input from '@/components/atoms/common/O_Input';
import Paragraph from '@/components/atoms/common/O_Paragraph';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import { Calendar } from '@nextui-org/calendar';
import React from 'react';

const OnBoardingCalender = () => {
    return (
        <OnBoardingWrapper>
            <Title className="text-2xl text-left py-1" align="left">
                생일을 입력해 주세요
            </Title>
            <Paragraph className="text-left">{`력해주세요`}</Paragraph>
            <OnBoardingInnerWrapper>
                <Calendar />
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingCalender;
