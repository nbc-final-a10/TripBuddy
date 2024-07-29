import Input from '@/components/atoms/common/O_Input';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingButtonWrapper from '@/components/atoms/onboarding/OnBoardingButtonWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';

type OnBoardingInputProps = {
    mode: 'age' | 'nickname';
};

const OnBoardingInput = ({ mode }: OnBoardingInputProps) => {
    return (
        <OnBoardingWrapper>
            <Title>{`${mode === 'age' ? '나이' : '닉네임'}을 입력해주세요`}</Title>
            <OnBoardingButtonWrapper>
                <Input
                    type="text"
                    placeholder={mode === 'age' ? '나이' : '닉네임'}
                    name={mode === 'age' ? 'age' : 'nickname'}
                    className="w-[90%] h-[80px]"
                />
            </OnBoardingButtonWrapper>
        </OnBoardingWrapper>
    );
};

export default OnBoardingInput;
