import Link from 'next/link';
import React from 'react';
import ArrowRight from '../../../../public/svg/ArrowRight.svg';

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
        <div className="mb-4 mt-12">
            <div className="flex justify-between">
                <p className="text-grayscale-color-800 text-[22px] font-extrabold">
                    {title}
                </p>
                <Link
                    href={href}
                    className="text-grayscale-color-700 text-[14px] font-medium flex justiy-end items-center"
                >
                    <span>{buttonText}</span>
                    <ArrowRight />
                </Link>
            </div>

            <p className="text-grayscale-color-700 text-[16px] font-medium">
                {description}
            </p>
        </div>
    );
};

export default HomePageTitle;
