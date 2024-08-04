'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TapMenuButtonProps {
    iconName: string;
    href: string;
}

const TapMenuButton: React.FC<TapMenuButtonProps> = ({ iconName, href }) => {
    return (
        <Link href={href}>
            <button className="flex items-center justify-center w-full p-4 hover:bg-main-color focus:outline-none">
                <Image
                    src={`/svg/${iconName}.svg`}
                    alt={iconName}
                    width={24}
                    height={24}
                />
            </button>
        </Link>
    );
};

export default TapMenuButton;
