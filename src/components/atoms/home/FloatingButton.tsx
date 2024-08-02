'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function FloatingButton() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(0.2, 1 - scrollY / 200); // 최소 투명도 0.2로 설정
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Link href="/write">
            <div
                className="fixed bottom-20 right-8 bg-main-color text-white rounded-full p-4 shadow-lg"
                style={{ opacity }}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 4l4 4-8 8H8v-4l8-8z"
                    ></path>
                </svg>
            </div>
        </Link>
    );
}
