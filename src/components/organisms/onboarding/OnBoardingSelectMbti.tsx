import Chip from '@/components/atoms/common/O_Chip';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import { mbtis } from '@/data/mbtis';
import { MouseEvent } from 'react';

type OnBoardingSelectMbtiProps = {
    selectedMbti: string;
    isLabel?: boolean;
    handleMbtiChange: (e: MouseEvent<HTMLSpanElement>) => void;
};

const OnBoardingSelectMbti = ({
    selectedMbti,
    handleMbtiChange,
    isLabel = false,
}: OnBoardingSelectMbtiProps) => {
    return (
        <OnBoardingWrapper>
            <Title>{`MBTI를 선택해주세요`}</Title>
            <OnBoardingInnerWrapper>
                {isLabel && <label htmlFor="mbti">MBTI</label>}
                <section className="grid gap-2 w-[90%] grid-cols-4">
                    {mbtis.map(mbti => (
                        <Chip
                            key={mbti.mbti}
                            selected={selectedMbti.includes(mbti.mbti)}
                            onClick={handleMbtiChange}
                        >
                            {mbti.mbti}
                        </Chip>
                    ))}
                </section>
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingSelectMbti;
