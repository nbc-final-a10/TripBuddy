import Button from '@/components/atoms/common/O_Button';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import React, { useState } from 'react';

type OnBoardingSelectGenderProps = {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const OnBoardingSelectGender: React.FC<OnBoardingSelectGenderProps> = ({
    handleClick,
}) => {
    const [selected, setSelected] = useState<boolean | null>(null);

    const handleGenderSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelected(!selected);
        handleClick(e);
    };

    return (
        <OnBoardingWrapper>
            <Title>{`성별을 선택해주세요`}</Title>
            <OnBoardingInnerWrapper>
                <Button
                    selected={selected === true}
                    intent="onBoarding"
                    onClick={handleGenderSelect}
                >
                    남자
                </Button>
                <Button
                    selected={selected === false}
                    intent="onBoarding"
                    onClick={handleGenderSelect}
                >
                    여자
                </Button>
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingSelectGender;
