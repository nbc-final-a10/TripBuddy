'use client';

import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import { useAuth } from '@/hooks/auth';
import { useUpdateBuddyMutation } from '@/hooks/queries';
import useNextButton from '@/hooks/useFunnelNextStep';
import usePreferTheme from '@/hooks/usePreferTheme';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, {
    FormEvent,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import OnBoardingDivider from './OnBoardingDivider';
import OnBoardingSelectGender from './OnBoardingSelectGender';
import OnBoardingInput from './OnBoardingInput';
import OnBoardingSelectLocationMbti from './OnBoardingSelectLocationMbti';
import OnBoardingSelectPrefer from './OnBoardingSelectPrefer';
import useSelectRegion from '@/hooks/useSelectRegion';
import { useRouter, useSearchParams } from 'next/navigation';
import { onBoardingValidation } from '@/utils/onboarding/onBoardingValidation';
import { PartialBuddy } from '@/types/Auth.types';
import { getBirthDate } from '@/utils/common/getBirthDate';

const OnBoarding: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { logOut, buddy } = useAuth();
    const { mutate, isPending, error } = useUpdateBuddyMutation();
    const [PreferBuddyTheme, selectedBuddyTheme] = usePreferTheme({
        mode: 'buddy',
    });
    const [PreferTripTheme, selectedTripTheme] = usePreferTheme({
        mode: 'trip',
    });
    const { SelectRegion, secondLevelLocation, thirdLevelLocation } =
        useSelectRegion();
    const { NextButton, step, setStep } = useNextButton({
        buttonText: '다음',
        limit: 10,
    });

    const nicknameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const [selectedGender, setSelectedGender] = useState<string>('');
    const [selectedMbti, setSelectedMbti] = useState<string>('');

    const handleGenderButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        const selectedGender = target.innerText;
        console.log('선택된 성별 ===>', selectedGender);
        setSelectedGender(selectedGender);
    };

    const handleMbtiChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        console.log('선택된 MBTI ===>', target.innerText);
        setSelectedMbti(target.innerText);
    };

    // 온보딩은 isOnboarding이 false일 때 한번만 되는 것인데
    // 마지막 step 에서 한번에 fetch 하게 되면
    // 모종의 이유로 에러가 발생해서 시퀀스가 중단 되었을 경우에
    // 아무 정보도 fetch 하지 못한 상태가 되기 때문에
    // 각 step 마다 fetch 하는 것으로 결정
    const handleNextButtonClick = () => {
        if (!buddy) {
            return showAlert('error', '로그인을 먼저 해주세요.');
        }

        const buddyInfo: PartialBuddy = {
            buddy_id: buddy.buddy_id,
        };

        // step 번호에 따라 유효성 검사 진행
        // 유효성 검사 진행 후 fetch 날리고 다음 단계로 이동
        if (step === 0) {
            const result = onBoardingValidation(
                nicknameRef.current?.value,
                step,
            );
            if (!result) return setStep(0);
            buddyInfo.buddy_nickname = nicknameRef.current?.value;
            mutate(buddyInfo);
        }
        if (step === 2) {
            const age = Number(ageRef.current?.value);

            const result = onBoardingValidation(age, step);
            if (!result) return setStep(2);

            const birthTimestamptz = getBirthDate(age);

            buddyInfo.buddy_birth = birthTimestamptz;
            mutate(buddyInfo);
        }
        if (step === 3) {
            const result = onBoardingValidation(selectedGender, step);
            if (!result) return setStep(3);
            buddyInfo.buddy_sex = selectedGender;
            mutate(buddyInfo);
        }
        if (step === 4) {
            const result = onBoardingValidation(
                [secondLevelLocation, thirdLevelLocation],
                step,
            );
            if (!result) return setStep(4);
            buddyInfo.buddy_region = [
                thirdLevelLocation,
                secondLevelLocation,
            ].join(' ');
            mutate(buddyInfo);
        }
        if (step === 5) {
            const result = onBoardingValidation(selectedMbti, step);
            if (!result) return setStep(5);
            buddyInfo.buddy_mbti = selectedMbti;
            mutate(buddyInfo);
        }
        if (step === 7) {
            const result = onBoardingValidation(selectedBuddyTheme, step);
            if (!result) return setStep(7);
            buddyInfo.buddy_preferred_buddy1 = selectedBuddyTheme[0];
            buddyInfo.buddy_preferred_buddy2 = selectedBuddyTheme[1];
            buddyInfo.buddy_preferred_buddy3 = selectedBuddyTheme[2];
            mutate(buddyInfo);
        }
        if (step === 8) {
            const result = onBoardingValidation(selectedTripTheme, step);
            if (!result) return setStep(8);
            buddyInfo.buddy_preferred_theme1 = selectedTripTheme[0];
            buddyInfo.buddy_preferred_theme2 = selectedTripTheme[1];
            buddyInfo.buddy_preferred_theme3 = selectedTripTheme[2];
            mutate(buddyInfo);
        }
    };

    useEffect(() => {
        if (error) {
            // NextButton에서 onClick 순서 변경?
            if (error.message === '이미 존재하는 닉네임입니다.') setStep(0);
            return showAlert('error', error.message);
        }
    }, [error, setStep]);

    useEffect(() => {
        if (!buddy) return;
        if (buddy.buddy_isOnBoarding)
            return showAlert('caution', '이미 온보딩을 완료하셨습니다.', {
                onConfirm: () => router.push('/'),
            });
        if (step <= 9) router.push(`/onboarding?funnel=${step}`);
        if (step > 9) {
            const buddyInfo = {
                buddy_id: buddy.buddy_id,
                buddy_isOnBoarding: true,
            };
            mutate(buddyInfo);
            router.push('/');
        }
    }, [step, router, buddy, mutate]);

    useEffect(() => {
        const funnel = searchParams.get('funnel');
        if (funnel) setStep(Number(funnel));
    }, [searchParams, setStep]);

    // 이 유즈이펙트는 완성하면 지울것!
    useEffect(() => {
        console.log('선택된 버디 테마 ===>', selectedBuddyTheme);
        console.log('선택된 여정 테마 ===>', selectedTripTheme);
        console.log(
            '선택된 지역 ===>',
            secondLevelLocation,
            thirdLevelLocation,
        );
        console.log('선택된 성별 ===>', selectedGender);
    }, [
        selectedBuddyTheme,
        selectedTripTheme,
        secondLevelLocation,
        thirdLevelLocation,
        selectedGender,
    ]);

    return (
        <section className="w-full h-[calc(100dvh-57px-58px)]">
            <ProgressIndicator step={step} counts={9} />

            <div className="flex flex-col w-full h-[70%]">
                {/** mutate 중에 로딩 띄우기 */}
                {isPending && (
                    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                        <div className="text-center text-white font-bold">
                            업데이트 중...
                        </div>
                    </div>
                )}

                {step === 0 && (
                    <OnBoardingInput mode="nickname" ref={nicknameRef} />
                )}
                {step === 1 && (
                    <OnBoardingDivider
                        mode="welcome"
                        name={nicknameRef.current?.value || ''}
                    />
                )}
                {step === 2 && <OnBoardingInput mode="age" ref={ageRef} />}
                {step === 3 && (
                    <OnBoardingSelectGender
                        handleClick={handleGenderButtonClick}
                    />
                )}
                {step === 4 && (
                    <OnBoardingSelectLocationMbti
                        mode="location"
                        selected={thirdLevelLocation}
                        SelectRegion={SelectRegion}
                    />
                )}
                {step === 5 && (
                    <OnBoardingSelectLocationMbti
                        mode="mbti"
                        selected={selectedMbti}
                        handleChange={handleMbtiChange}
                    />
                )}
                {step === 6 && (
                    <OnBoardingDivider
                        mode="middle"
                        name={nicknameRef.current?.value || ''}
                    />
                )}
                {step === 7 && (
                    <OnBoardingSelectPrefer
                        mode="buddy"
                        component={<PreferBuddyTheme />}
                    />
                )}
                {step === 8 && (
                    <OnBoardingSelectPrefer
                        mode="trip"
                        component={<PreferTripTheme />}
                    />
                )}
                {step === 9 && (
                    <OnBoardingDivider
                        mode="end"
                        name={nicknameRef.current?.value || ''}
                    />
                )}
            </div>
            <div className="flex justify-center">
                <NextButton
                    className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-full"
                    onClick={handleNextButtonClick}
                />
            </div>
            <button onClick={logOut}>임시로그아웃</button>
        </section>
    );
};

export default OnBoarding;
