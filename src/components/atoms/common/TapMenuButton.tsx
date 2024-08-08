'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
    return (
        <Link href={href}>
            <button className="flex flex-col items-center justify-center w-full p-4 hover:bg-main-color focus:outline-none">
                <Image
                    src={`/svg/${iconName}.svg`}
                    alt={iconName}
                    width={24}
                    height={24}
                />
                <span className="text-[12px] font-bold text-grayscale-color-300">
                    {title}
                </span>
            </button>
        </Link>
    );
};

export default TapMenuButton;
