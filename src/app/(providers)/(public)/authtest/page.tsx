'use client';

import { useAuth } from '@/hooks/auth.hooks';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useEffect } from 'react';

function TestPage() {
    const { logOut } = useAuth();

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

            <form>
                <label htmlFor="nickname">닉네임</label>
                <input type="text" id="nickname" />

                <label htmlFor="gender">성별</label>
                <select id="gender">
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                </select>

                <label htmlFor="birth">생년월일</label>
                <input type="date" id="birth" />

                <select>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                </select>
            </form>
        </div>
    );
}

export default TestPage;
