'use client';

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
        console.log('테스트 알림 확인');
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
                <input type="text" id="nickname" />

                <label htmlFor="gender">성별</label>
                <select id="gender">
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                </select>

                <label htmlFor="birth">생년월일</label>
                <input type="date" id="birth" />

                <label htmlFor="introduction">자기소개</label>
                <input type="text" id="introduction" />

                <label htmlFor="region">지역</label>
                <input type="text" id="region" />

                <label htmlFor="buddyTheme">선호버디테마</label>
                <select id="buddyTheme" onChange={handleSelectChange}>
                    {buddyThemes.map(theme => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>

                <label htmlFor="tripTheme">선호여행테마</label>
                <select id="tripTheme" onChange={handleSelectChange}>
                    {tripThemes.map(theme => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>

                <label htmlFor="mbti">MBTI</label>
                <select id="mbti" onChange={handleSelectChange}>
                    {mbtis.map(mbti => (
                        <option key={mbti.mbti} value={mbti.mbti}>
                            {mbti.mbti}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
}

export default TestPage;
