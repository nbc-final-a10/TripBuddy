'use client';

import { useAuth } from '@/hooks/auth.hooks';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useEffect } from 'react';

function TestPage() {
    const { logOut } = useAuth();

    useEffect(() => {
        showAlert(
            'success',
            '테스트 알림입니다.',
            () => {
                console.log('테스트 알림 확인');
            },
            true,
        );
    }, []);

    return (
        <div>
            <p>TestPage</p>
            <div>
                <button className="text-red-500" onClick={() => logOut()}>
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default TestPage;
