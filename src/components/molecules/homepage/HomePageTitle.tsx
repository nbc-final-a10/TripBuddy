import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface HomePageTitleProps {
    title: string;
    buttonText: string;
    description: string;
    href: string;
    className?: string;
}

const HomePageTitle: React.FC<HomePageTitleProps> = ({
    title,
    buttonText,
    description,
    href,
    className,
}) => {
    return (
        <div className={twMerge('mb-4', className)}>
            <div className="flex justify-between">
                <p className="text-lg font-bold">{title}</p>
                <Link href={href} className="text-xs">
                    {buttonText}
                </Link>
            </div>

            <p className="text-sm">{description}</p>
        </div>
    );
};

export default HomePageTitle;
