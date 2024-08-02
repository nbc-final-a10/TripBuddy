import Link from 'next/link';
import React from 'react';

interface HomePageTitleProps {
    title: string;
    buttonText: string;
    description: string;
    href: string;
}

const HomePageTitle: React.FC<HomePageTitleProps> = ({
    title,
    buttonText,
    description,
    href,
}) => {
    return (
        <div className="mb-4">
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
