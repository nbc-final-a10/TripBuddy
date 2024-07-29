import Input from '@/components/atoms/common/O_Input';
import Title from '@/components/atoms/common/O_Title';
import OnBoardingInnerWrapper from '@/components/atoms/onboarding/OnBoardinginnerWrapper';
import OnBoardingWrapper from '@/components/atoms/onboarding/OnBoardingWrapper';
import React, { forwardRef } from 'react';

type OnBoardingInputProps = {
    mode: 'age' | 'nickname';
    ref: React.Ref<HTMLInputElement>;
};

const OnBoardingInput = forwardRef(({ mode }: OnBoardingInputProps, ref) => {
    return (
        <OnBoardingWrapper>
            {mode === 'nickname' && (
                <Title className="text-2xl">안녕하세요!</Title>
            )}
            <Title>{`${mode === 'age' ? '나이를' : '먼저 닉네임을'} 입력해주세요`}</Title>
            <OnBoardingInnerWrapper>
                <Input
                    type={mode === 'age' ? 'number' : 'text'}
                    placeholder={mode === 'age' ? '나이' : '닉네임'}
                    name={mode === 'age' ? 'age' : 'nickname'}
                    className="w-[90%] h-[80px]"
                    ref={ref as React.LegacyRef<HTMLInputElement>}
                />
            </OnBoardingInnerWrapper>
        </OnBoardingWrapper>
    );
});

OnBoardingInput.displayName = 'OnBoardingInput';

export default OnBoardingInput;
