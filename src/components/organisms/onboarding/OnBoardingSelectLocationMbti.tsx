import Chip from '@/components/atoms/common/O_Chip';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import { mbtis } from '@/data/mbtis';
import React, { MouseEvent } from 'react';

type OnBoardingSelectLocationMbtiProps = {
    mode: 'location' | 'mbti';
    selected: string;
    isLabel?: boolean;
    handleChange?: (e: MouseEvent<HTMLSpanElement>) => void;
    SelectRegion?: React.FC | null;
};

const OnBoardingSelectLocationMbti = ({
    mode,
    selected,
    handleChange = () => {},
    isLabel = false,
    SelectRegion = null,
}: OnBoardingSelectLocationMbtiProps) => {
    return (
        <OnBoardingWrapper>
            <Title>{`${mode === 'location' ? '지역을' : 'MBTI를'} 선택해주세요`}</Title>
            <OnBoardingInnerWrapper>
                {isLabel && (
                    <label>{mode === 'location' ? '지역' : 'MBTI'}</label>
                )}
                {mode === 'mbti' && (
                    <section className="grid gap-2 w-[90%] grid-cols-4">
                        {mbtis.map(mbti => (
                            <Chip
                                key={mbti.mbti}
                                selected={selected.includes(mbti.mbti)}
                                intent="onBoarding"
                                className="py-2.5"
                                onClick={handleChange}
                            >
                                {mbti.mbti}
                            </Chip>
                        ))}
                    </section>
                )}
                {mode === 'location' && SelectRegion && (
                    <section className="w-[90%] h-[80%] overflow-y-auto">
                        <SelectRegion />
                    </section>
                )}
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingSelectLocationMbti;
