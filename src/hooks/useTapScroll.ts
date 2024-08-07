'use client';
import React, { useEffect, useRef, useState } from 'react';
import useLockBodyScroll from './common/useLockBodyScroll';

type UseTapScrollProps = {
    refs: React.RefObject<HTMLElement>[];
};

function useTapScroll({ refs }: UseTapScrollProps) {
    const { setLock } = useLockBodyScroll(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeout = useRef<number | null>(null);

    useEffect(() => {
        const handleWheel = (container: HTMLElement) => (event: WheelEvent) => {
            if (!isScrolling) {
                setIsScrolling(true);
                console.log('Scrolling started');
            }
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
            event.preventDefault(); // Prevent default scrolling behavior
            container.scrollLeft += event.deltaY; // Scroll horizontally
            setLock(true);

            scrollTimeout.current = window.setTimeout(() => {
                setIsScrolling(false);
                setLock(false);
                console.log('Scrolling ended');
            }, 200); // Adjust timeout duration as needed
        };

        const handleMouseEnter = (event: MouseEvent) => {
            event.preventDefault();
            // setLock(true); // Lock body scroll
        };

        const handleMouseLeave = (event: MouseEvent) => {
            event.preventDefault();
            console.log('handleMouseLeave');
        };

        const containers = refs;
        if (containers) {
            containers.forEach(container => {
                const current = container.current;
                if (current) {
                    current.addEventListener('mouseenter', handleMouseEnter);
                    current.addEventListener('mouseleave', handleMouseLeave);
                    current.addEventListener('wheel', handleWheel(current));
                }
            });
        }

        return () => {
            if (containers) {
                containers.forEach(container => {
                    const current = container.current;
                    if (current) {
                        current.removeEventListener(
                            'mouseenter',
                            handleMouseEnter,
                        );
                        current.removeEventListener(
                            'mouseleave',
                            handleMouseLeave,
                        );
                        current.removeEventListener(
                            'wheel',
                            handleWheel(current),
                        );
                    }
                });
            }
        };
    }, [refs, setLock, isScrolling]);

    return null;
}

export default useTapScroll;

// const createMouseDownHandler = useCallback(
//     (scrollContainerRef: React.RefObject<HTMLElement>) => {
//         return (event: ReactMouseEvent) => {
//             const container = scrollContainerRef.current;
//             if (container) {
//                 const startX = event.pageX - container.offsetLeft;
//                 const scrollLeft = container.scrollLeft;

//                 const handleMouseMove = (moveEvent: MouseEvent) => {
//                     const x = moveEvent.pageX - container.offsetLeft;
//                     const walk = (x - startX) * 2; // Adjust scroll speed
//                     container.scrollLeft = scrollLeft - walk;
//                 };

//                 const handleMouseUp = () => {
//                     document.removeEventListener(
//                         'mousemove',
//                         handleMouseMove,
//                     );
//                     document.removeEventListener('mouseup', handleMouseUp);
//                 };

//                 document.addEventListener('mousemove', handleMouseMove);
//                 document.addEventListener('mouseup', handleMouseUp);
//             }
//         };
//     },
//     [],
// );

// return { createMouseDownHandler };

// let startX: number;
// let scrollLeft: number;

// const handleMouseDown =
//     (container: HTMLElement) => (event: MouseEvent) => {
//         // setLock(true); // Lock body scroll
//         startX = event.pageX - container.offsetLeft;
//         scrollLeft = container.scrollLeft;
//     };

// const handleMouseMove =
//     (container: HTMLElement) => (event: MouseEvent) => {
//         event.preventDefault();
//         // const x = event.pageX - container.offsetLeft;
//         // const walk = (x - startX) * 2; // Adjust scroll speed
//         // container.scrollLeft = scrollLeft - walk;
//     };

// const handleMouseUp = (container: HTMLElement) => () => {
//     // setLock(false); // Unlock body scroll
//     container.removeEventListener(
//         'mousemove',
//         handleMouseMove(container),
//     );
//     // document.removeEventListener('mouseup', handleMouseUp(container));
// };
