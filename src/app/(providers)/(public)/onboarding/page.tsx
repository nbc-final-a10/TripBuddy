'use client';

import Chip from '@/components/atoms/common/O_Chip';
import locationData from '@/data/location';
import { mbtis } from '@/data/mbtis';
import { buddyThemes, tripThemes } from '@/data/themes';
import { useAuth } from '@/hooks/auth.hooks';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';

function OnBoardingPage() {
    const { logOut } = useAuth();

    const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
    const [selectedBuddyTheme, setSelectedBuddyTheme] = useState<string[]>([]);
    const [selectedTripTheme, setSelectedTripTheme] = useState<string[]>([]);
    const [selectedMbti, setSelectedMbti] = useState<string>('');

    const setStateActionWhenChipClick =
        (target: EventTarget & HTMLSpanElement) => (prevSelected: string[]) => {
            if (prevSelected.includes(target.innerText)) {
                // 선택 해제
                return prevSelected.filter(l => l !== target.innerText);
            } else if (prevSelected.length < 3) {
                // 새로운 선택 추가
                return [...prevSelected, target.innerText];
            } else {
                // 선택된 Chip이 3개일 때, 가장 가까운 인덱스의 Chip을 해제하고 새로운 선택 추가
                const newSelected = [...prevSelected];
                const indexToReplace = prevSelected
                    .map(selected =>
                        locationData[0].subLocations.findIndex(
                            option => option.name === selected,
                        ),
                    )
                    .reduce(
                        (closest, current, idx, arr) =>
                            Math.abs(
                                current -
                                    locationData[0].subLocations.findIndex(
                                        option =>
                                            option.name === target.innerText,
                                    ),
                            ) <
                            Math.abs(
                                arr[closest] -
                                    locationData[0].subLocations.findIndex(
                                        option =>
                                            option.name === target.innerText,
                                    ),
                            )
                                ? idx
                                : closest,
                        0,
                    );
                newSelected[indexToReplace] = target.innerText;
                return newSelected;
            }
        };

    const handleLocationChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedLocation(setStateActionWhenChipClick(target));
    };

    const handleBuddyThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedBuddyTheme(setStateActionWhenChipClick(target));
    };

    const handleTripThemeChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedTripTheme(setStateActionWhenChipClick(target));
    };

    const handleMbtiChange = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.currentTarget;
        setSelectedMbti(target.innerText);
    };

    // const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     const selectedOptions = Array.from(event.target.selectedOptions);
    //     if (selectedOptions.length > 3) {
    //         selectedOptions.forEach(option => (option.selected = false));
    //         alert('최대 3개의 테마만 선택할 수 있습니다.');
    //     }
    // };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const nickname = formData.get('nickname');
        const gender = formData.get('gender');
        const birth = formData.get('birth');
        const introduction = formData.get('introduction');
        const region = formData.get('region');
        const buddyTheme = formData.getAll('buddyTheme');
        const tripTheme = formData.getAll('tripTheme');
        const mbti = formData.get('mbti');

        console.log('nickname ===>', nickname);
        console.log('gender ===>', gender);
        console.log('birth ===>', birth);
        console.log('introduction ===>', introduction);
        console.log('region ===>', region);
        console.log('buddyTheme ===>', buddyTheme);
        console.log('tripTheme ===>', tripTheme);
        console.log('mbti ===>', mbti);
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
