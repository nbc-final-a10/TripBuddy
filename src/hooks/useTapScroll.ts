'use client';
import React, { useRef, MouseEvent as ReactMouseEvent } from 'react';

function useTapScroll() {
    const createMouseDownHandler = (
        scrollContainerRef: React.RefObject<HTMLDivElement>,
    ) => {
        return (event: ReactMouseEvent) => {
            const container = scrollContainerRef.current;
            if (container) {
                const startX = event.pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                    const x = moveEvent.pageX - container.offsetLeft;
                    const walk = (x - startX) * 2; // Adjust scroll speed
                    container.scrollLeft = scrollLeft - walk;
                };

                const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
        };
    };

    return { createMouseDownHandler };
}

export default useTapScroll;
