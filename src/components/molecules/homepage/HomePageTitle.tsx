import React from 'react';

interface HomePageTitleProps {
    title: string;
    buttonText: string;
    description: string;
}

const HomePageTitle: React.FC<HomePageTitleProps> = ({
    title,
    buttonText,
    description,
}) => {
    return (
        <div className="mb-4">
            <div className="flex justify-between">
                <p className="text-lg font-bold">{title}</p>
                <button className="text-xs">{buttonText}</button>
            </div>

            <p className="text-sm">{description}</p>
        </div>
    );
};

export default HomePageTitle;
