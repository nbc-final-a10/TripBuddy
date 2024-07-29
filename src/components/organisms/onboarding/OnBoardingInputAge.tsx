import Input from '@/components/atoms/common/O_Input';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingButtonWrapper from '@/components/atoms/onboarding/OnBoardingButtonWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';

const OnBoardingInputAge = () => {
    return (
        <OnBoardingWrapper>
            <Title>{`나이를 입력해주세요`}</Title>
            <OnBoardingButtonWrapper>
                <Input
                    type="text"
                    placeholder="나이 입력"
                    name="age"
                    className="w-[90%] h-[80px]"
                />
            </OnBoardingButtonWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingInputAge;
