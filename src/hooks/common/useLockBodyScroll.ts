import { useLayoutEffect, useState, useCallback } from 'react';

const useLockBodyScroll = (initialState: boolean = false) => {
    const [isLocked, setIsLocked] = useState(initialState);
    const [scrollY, setScrollY] = useState(0);
    const [originalStyle, setOriginalStyle] = useState<string | null>(null);

    const lockScroll = useCallback(() => {
        if (!isLocked) {
            setOriginalStyle(window.getComputedStyle(document.body).overflow);
            setScrollY(window.scrollY);
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
            setIsLocked(true);
        }
    }, [isLocked]);

    const unlockScroll = useCallback(() => {
        if (isLocked && originalStyle !== null) {
            document.body.style.overflow = originalStyle;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollY);
            setIsLocked(false);
        }
    }, [isLocked, originalStyle, scrollY]);

    useLayoutEffect(() => {
        return () => {
            if (isLocked) {
                unlockScroll();
            }
        };
    }, [isLocked, unlockScroll]);

    const setLock = useCallback(
        (lock: boolean) => {
            if (lock) {
                lockScroll();
            } else {
                unlockScroll();
            }
        },
        [lockScroll, unlockScroll],
    );

    return { isLocked, setLock };
};

export default useLockBodyScroll;

// import { useLayoutEffect, useState } from 'react';

// const useLockBodyScroll = () => {
//     const [isLocked, setIsLocked] = useState(false);

//     useLayoutEffect(() => {
//         // 현재 스크롤 위치 저장
//         const originalStyle = window.getComputedStyle(document.body).overflow;
//         const scrollY = window.scrollY;

//         // 스크롤 잠금
//         document.body.style.overflow = 'hidden';
//         document.body.style.position = 'fixed';
//         document.body.style.top = `-${scrollY}px`;
//         document.body.style.width = '100%';

//         // 상태를 잠금으로 설정
//         setIsLocked(true);

//         // 컴포넌트 언마운트 시 원래 스타일 복원
//         return () => {
//             document.body.style.overflow = originalStyle;
//             document.body.style.position = '';
//             document.body.style.top = '';
//             window.scrollTo(0, scrollY);

//             // 상태를 잠금 해제로 설정
//             setIsLocked(false);
//         };
//     }, []);

//     return { isLocked, setIsLocked };
// };

// export default useLockBodyScroll;
