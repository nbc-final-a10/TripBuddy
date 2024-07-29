import Button from '@/components/atoms/common/O_Button';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingButtonWrapper from '@/components/atoms/onboarding/OnBoardingButtonWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';

const OnBoardingSelectGender = () => {
    return (
        <OnBoardingWrapper>
            <Title>{`성별을 선택해주세요`}</Title>
            <OnBoardingButtonWrapper>
                <Button selected={true} intent="onBoarding">
                    남자
                </Button>
                <Button selected={false} intent="onBoarding">
                    여자
                </Button>
            </OnBoardingButtonWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingSelectGender;
