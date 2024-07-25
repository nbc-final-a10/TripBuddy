'use client';

import Chip from '@/components/atoms/common/O_Chip';
import { locationData } from '@/data/location';
import { mbtis } from '@/data/mbtis';
import { buddyThemes, tripThemes } from '@/data/themes';
import { useAuth, useUpdateBuddyInfoMutation } from '@/hooks/auth.hooks';
import { type BuddyTheme, type TripTheme } from '@/types/Themes.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { FormEvent, MouseEvent, useCallback, useState } from 'react';

function OnBoardingPage() {
    const { logOut } = useAuth();

    const { mutate, isPending, error } = useUpdateBuddyInfoMutation();

    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedBuddyTheme, setSelectedBuddyTheme] = useState<string[]>([]);
    const [selectedTripTheme, setSelectedTripTheme] = useState<string[]>([]);
    const [selectedMbti, setSelectedMbti] = useState<string>('');

    const handleChipClick = useCallback(
        (
            target: EventTarget & HTMLSpanElement,
            data: TripTheme[] | BuddyTheme[],
            prevSelected: string[],
            setSelected: (value: string[]) => void,
        ) => {
            if (prevSelected.includes(target.innerText)) {
                // 선택 해제
                const newSelected = prevSelected.filter(
                    selected => selected !== target.innerText,
                );
                setSelected(newSelected);
            } else if (prevSelected.length < 3) {
                // 새로운 선택 추가
                setSelected([...prevSelected, target.innerText]);
            } else {
                // 선택된 Chip이 3개일 때, 가장 가까운 인덱스의 Chip을 해제하고 새로운 선택 추가
                const newSelected = [...prevSelected];
                const targetIndex = data.findIndex(
                    item => item === target.innerText,
                );
                const indexToReplace = prevSelected
                    .map(selected => data.findIndex(item => item === selected))
                    .reduce(
                        (prev, curr, idx) =>
                            Math.abs(curr - targetIndex) <
                            Math.abs(prev - targetIndex)
                                ? idx
                                : prev,
                        0,
                    );
                newSelected[indexToReplace] = target.innerText;
                setSelected(newSelected);
            }
        },
        [],
    );

    const handleLocationChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedLocation(target.innerText);
    };

    const handleBuddyThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;

        const mutableBuddyThemes = [...buddyThemes];
        handleChipClick(
            target,
            mutableBuddyThemes,
            selectedBuddyTheme,
            setSelectedBuddyTheme,
        );
    };

    const handleTripThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        const mutableTripThemes = [...tripThemes];
        handleChipClick(
            target,
            mutableTripThemes,
            selectedTripTheme,
            setSelectedTripTheme,
        );
    };

    const handleMbtiChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedMbti(target.innerText);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const nickname = formData.get('nickname') as string;
        const gender = formData.get('gender') as string;
        const birth = formData.get('birth') as string;
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

    return (
        <div>
            <p>TestPage</p>
            <div>
                <button className="text-red-500" onClick={() => logOut()}>
                    로그아웃
                </button>
            </div>

            <form onSubmit={handleSubmit}>
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
                            key={location.name}
                            selected={selectedLocation.includes(location.name)}
                            onClick={handleLocationChange}
                            intent={location.name}
                        >
                            {location.name}
                        </Chip>
                    ))}
                </section>

                <label htmlFor="buddyTheme">선호버디테마</label>
                <section className="flex flex-wrap gap-2">
                    {buddyThemes.map(theme => (
                        <Chip
                            key={theme}
                            selected={selectedBuddyTheme.includes(theme)}
                            onClick={handleBuddyThemeChange}
                            intent={theme}
                        >
                            {theme}
                        </Chip>
                    ))}
                </section>

                <label htmlFor="tripTheme">선호여행테마</label>
                <section className="flex flex-wrap gap-2">
                    {tripThemes.map(theme => (
                        <Chip
                            key={theme}
                            selected={selectedTripTheme.includes(theme)}
                            onClick={handleTripThemeChange}
                            intent={theme}
                        >
                            {theme}
                        </Chip>
                    ))}
                </section>

                <label htmlFor="mbti">MBTI</label>
                <section className="flex flex-wrap gap-2">
                    {mbtis.map(mbti => (
                        <Chip
                            key={mbti.mbti}
                            selected={selectedMbti.includes(mbti.mbti)}
                            onClick={handleMbtiChange}
                            intent={mbti.mbti}
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
            </form>
        </div>
    );
}

export default OnBoardingPage;
