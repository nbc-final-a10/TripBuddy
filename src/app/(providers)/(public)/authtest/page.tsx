'use client';

import { showAlert } from '@/utils/ui/openCustomAlert';
import { useEffect } from 'react';

function TestPage() {
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

    return <div>TestPage</div>;
}

export default TestPage;
