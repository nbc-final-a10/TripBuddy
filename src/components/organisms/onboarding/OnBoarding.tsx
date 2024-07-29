'use client';

import Chip from '@/components/atoms/common/O_Chip';
import ProgressIndicator from '@/components/atoms/write/ProgressIndicator';
import locationData from '@/data/location';
import { mbtis } from '@/data/mbtis';
import { useAuth } from '@/hooks/auth';
import { useUpdateBuddyMutation } from '@/hooks/queries';
import useNextButton from '@/hooks/useFunnelNextStep';
import usePreferTheme from '@/hooks/usePreferTheme';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { FormEvent, MouseEvent, useEffect, useState } from 'react';
import OnBoardingWelcome from './OnBoardingWelcom';
import OnBoardingSelectGender from './OnBoardingSelectGender';

const OnBoarding: React.FC = () => {
    const { logOut, buddy } = useAuth();

    const { mutate, isPending, error } = useUpdateBuddyMutation();

    const [PreferBuddyTheme, selectedBuddyTheme] = usePreferTheme({
        mode: 'buddy',
        isLabel: true,
    });

    const [PreferTripTheme, selectedTripTheme] = usePreferTheme({
        mode: 'trip',
        isLabel: true,
    });

    const { NextButton, step } = useNextButton({
        buttonText: '다음',
        limit: 6,
    });

    const [isStart, setIsStart] = useState<boolean>(true);

    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedMbti, setSelectedMbti] = useState<string>('');

    const handleLocationChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedLocation(target.innerText);
    };

    const handleMbtiChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedMbti(target.innerText);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!buddy) {
            return showAlert('error', '로그인을 먼저 해주세요.');
        }

        const formData = new FormData(e.currentTarget);

        const nickname = formData.get('nickname') as string;
        const gender = formData.get('gender') as string;
        const birth = formData.get('birth') as string;
        if (!birth) {
            return showAlert('error', '생년월일을 입력해주세요.');
        }
        const birthDate = new Date(birth);
        const birthTimestamptz = birthDate.toISOString();
        const introduction = formData.get('introduction') as string;

        console.log('nickname ===>', nickname);
        console.log('gender ===>', gender);
        console.log('birth ===>', birthTimestamptz);
        console.log('introduction ===>', introduction);
        console.log('region ===>', selectedLocation);
        console.log('buddyTheme ===>', selectedBuddyTheme);
        console.log('tripTheme ===>', selectedTripTheme);
        console.log('mbti ===>', selectedMbti);

        if (
            !nickname ||
            !gender ||
            !birth ||
            !introduction ||
            selectedLocation.length < 3 ||
            selectedBuddyTheme.length < 3 ||
            selectedTripTheme.length < 3 ||
            !selectedMbti
        ) {
            return showAlert('error', '입력 정보를 모두 입력해주세요.');
        }

        const buddyInfo = {
            buddy_id: buddy.buddy_id,
            buddy_nickname: nickname,
            buddy_sex: gender,
            buddy_birth: birthTimestamptz,
            buddy_introduction: introduction,
            buddy_region: selectedLocation,
            buddy_preferred_buddy1: selectedBuddyTheme[0],
            buddy_preferred_buddy2: selectedBuddyTheme[1],
            buddy_preferred_buddy3: selectedBuddyTheme[2],
            buddy_preferred_theme1: selectedTripTheme[0],
            buddy_preferred_theme2: selectedTripTheme[1],
            buddy_preferred_theme3: selectedTripTheme[2],
            buddy_mbti: selectedMbti,
        };

        mutate(buddyInfo);
    };

    useEffect(() => {
        if (error) {
            // console.error(error);
            return showAlert('error', error.message);
        }
    }, [error]);

    return (
        <section className="w-full h-[calc(100dvh-57px-58px)]">
            {!isStart && <ProgressIndicator step={step} counts={7} />}

            <div className="flex flex-col w-full h-[90%]">
                {isStart && <OnBoardingWelcome />}
                {!isStart && step === 0 && <OnBoardingSelectGender />}
            </div>
            <div className="flex justify-center">
                {isStart && (
                    <button
                        onClick={() => setIsStart(false)}
                        className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-full"
                    >
                        시작하기
                    </button>
                )}
                {!isStart && (
                    <NextButton className="text-2xl bg-main-color font-bold py-2 px-4 mt-4 rounded w-full" />
                )}
            </div>

            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    className="w-full border-2 border-gray-300 rounded-md"
                />

                <label htmlFor="gender">성별</label>
                <select
                    id="gender"
                    name="gender"
                    className="w-full border-2 border-gray-300 rounded-md"
                >
                    <option value="남자" defaultValue={'남자'}>
                        남자
                    </option>
                    <option value="여자">여자</option>
                </select>

                <label htmlFor="birth">생년월일</label>
                <input
                    type="date"
                    id="birth"
                    name="birth"
                    className="w-full border-2 border-gray-300 rounded-md"
                />

                <label htmlFor="introduction">자기소개</label>
                <input
                    type="text"
                    id="introduction"
                    name="introduction"
                    className="w-full border-2 border-gray-300 rounded-md"
                />

                <label htmlFor="region">지역</label>
                <section className="flex flex-wrap gap-2">
                    {locationData[0].subLocations.map(location => (
                        <Chip
                            key={location.name.en}
                            selected={selectedLocation.includes(
                                location.name.ko,
                            )}
                            onClick={handleLocationChange}
                        >
                            {location.name.ko}
                        </Chip>
                    ))}
                </section>

                <PreferBuddyTheme />

                <PreferTripTheme />

                <label htmlFor="mbti">MBTI</label>
                <section className="flex flex-wrap gap-2">
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

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded-md"
                    type="submit"
                >
                    제출
                </button>
            </form> */}
        </section>
    );
};

export default OnBoarding;
