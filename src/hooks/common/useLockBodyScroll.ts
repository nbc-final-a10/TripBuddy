import { useLayoutEffect, useState } from 'react';

const useLockBodyScroll = () => {
    const [isLocked, setIsLocked] = useState(false);

    useLayoutEffect(() => {
        // 현재 스크롤 위치 저장
        const originalStyle = window.getComputedStyle(document.body).overflow;
        const scrollY = window.scrollY;

        // 스크롤 잠금
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // 상태를 잠금으로 설정
        setIsLocked(true);

        // 컴포넌트 언마운트 시 원래 스타일 복원
        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY);

            // 상태를 잠금 해제로 설정
            setIsLocked(false);
        };
    }, []);

    return isLocked;
};

export default useLockBodyScroll;
