'use client';

import locationData from '@/data/location';
import { mbtis } from '@/data/mbtis';
import { buddyThemes, tripThemes } from '@/data/themes';
import { useAuth } from '@/hooks/auth.hooks';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { ChangeEvent, FormEvent, useEffect } from 'react';

function TestPage() {
    const { logOut } = useAuth();

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        if (selectedOptions.length > 3) {
            selectedOptions.forEach(option => (option.selected = false));
            alert('최대 3개의 테마만 선택할 수 있습니다.');
        }
    };

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

    useEffect(() => {
        showAlert('success', '테스트 알림입니다.', {
            onConfirm: () => {
                console.log('테스트 알림 확인');
            },
            isConfirm: true,
        });
    }, []);

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
                <select
                    id="region"
                    name="region"
                    className="w-full border-2 border-gray-300 rounded-md"
                >
                    {locationData[0].subLocations.map(location => (
                        <option
                            key={location.name}
                            value={location.name}
                            defaultValue={'서울/경기'}
                        >
                            {location.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="buddyTheme">선호버디테마</label>
                <select
                    id="buddyTheme"
                    name="buddyTheme"
                    onChange={handleSelectChange}
                    multiple
                    className="w-full border-2 border-gray-300 rounded-md"
                >
                    {buddyThemes.map(theme => (
                        <option key={theme} value={theme} defaultValue={'계획'}>
                            {theme}
                        </option>
                    ))}
                </select>

                <label htmlFor="tripTheme">선호여행테마</label>
                <select
                    id="tripTheme"
                    name="tripTheme"
                    onChange={handleSelectChange}
                    multiple
                    className="w-full border-2 border-gray-300 rounded-md"
                >
                    {tripThemes.map(theme => (
                        <option key={theme} value={theme} defaultValue={'도시'}>
                            {theme}
                        </option>
                    ))}
                </select>

                <label htmlFor="mbti">MBTI</label>
                <select
                    id="mbti"
                    name="mbti"
                    onChange={handleSelectChange}
                    className="w-full border-2 border-gray-300 rounded-md"
                >
                    {mbtis.map(mbti => (
                        <option
                            key={mbti.mbti}
                            value={mbti.mbti}
                            defaultValue={'INTJ'}
                        >
                            {mbti.mbti}
                        </option>
                    ))}
                </select>

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

export default TestPage;
