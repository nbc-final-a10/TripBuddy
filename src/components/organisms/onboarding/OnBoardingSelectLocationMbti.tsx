import Chip from '@/components/atoms/common/O_Chip';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import locationData from '@/data/location';
import { mbtis } from '@/data/mbtis';
import { MouseEvent } from 'react';

type OnBoardingSelectLocationMbtiProps = {
    mode: 'location' | 'mbti';
    selected: string;
    isLabel?: boolean;
    handleChange: (e: MouseEvent<HTMLSpanElement>) => void;
};

const OnBoardingSelectLocationMbti = ({
    mode,
    selected,
    handleChange,
    isLabel = false,
}: OnBoardingSelectLocationMbtiProps) => {
    return (
        <OnBoardingWrapper>
            <Title>{`${mode === 'location' ? '지역을' : 'MBTI를'} 선택해주세요`}</Title>
            <OnBoardingInnerWrapper>
                {isLabel && (
                    <label>{mode === 'location' ? '지역' : 'MBTI'}</label>
                )}
                <section className="grid gap-2 w-[90%] grid-cols-4">
                    {mode === 'mbti' &&
                        mbtis.map(mbti => (
                            <Chip
                                key={mbti.mbti}
                                selected={selected.includes(mbti.mbti)}
                                onClick={handleChange}
                            >
                                {mbti.mbti}
                            </Chip>
                        ))}
                    {mode === 'location' &&
                        locationData[0].subLocations.map(location => (
                            <Chip
                                key={location.name.en}
                                selected={selected.includes(location.name.ko)}
                                onClick={handleChange}
                            >
                                {location.name.ko}
                            </Chip>
                        ))}
                </section>
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingSelectLocationMbti;
