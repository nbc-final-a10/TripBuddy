'use client';

import Link from 'next/link';
import React from 'react';
import Home from '../../../../public/svg/Home.svg';
import Trip from '../../../../public/svg/Trip.svg';
import Chat from '../../../../public/svg/Chat.svg';
import Mypage from '../../../../public/svg/Mypage.svg';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
interface TapMenuButtonProps {
    iconName: string;
    href: string;
    title: string;
}

const TapMenuButton: React.FC<TapMenuButtonProps> = ({
    iconName,
    href,
    title,
}) => {
    const pathname = usePathname();

    return (
        <Link href={href}>
            <button className="flex flex-col items-center justify-center w-full p-4 focus:outline-none">
                {iconName === 'Home' && (
                    <Home
                        className={twMerge(
                            'w-6 h-6',
                            pathname === href
                                ? 'text-primary-color-400'
                                : 'text-grayscale-color-300',
                        )}
                    />
                )}
                {iconName === 'Trip' && (
                    <Trip
                        className={twMerge(
                            'w-6 h-6',
                            pathname === href
                                ? 'text-primary-color-400'
                                : 'text-grayscale-color-300',
                        )}
                    />
                )}
                {iconName === 'Chat' && (
                    <Chat
                        className={twMerge(
                            'w-6 h-6',
                            pathname === '/chat'
                                ? 'text-primary-color-400'
                                : 'text-grayscale-color-300',
                        )}
                    />
                )}
                {iconName === 'MyPage' && (
                    <Mypage
                        className={twMerge(
                            'w-6 h-6',
                            pathname.startsWith('/profile')
                                ? 'text-primary-color-400'
                                : 'text-grayscale-color-300',
                        )}
                    />
                )}
                <span
                    className={twMerge(
                        'text-[12px] font-bold',
                        pathname === href
                            ? 'text-primary-color-400'
                            : 'text-grayscale-color-300',
                    )}
                >
                    {title}
                </span>
            </button>
        </Link>
    );
};

export default TapMenuButton;
