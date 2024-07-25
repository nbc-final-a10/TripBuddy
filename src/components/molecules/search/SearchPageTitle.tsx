import React from 'react';

interface SearchPageTitleProps {
    title: string;
    description: string;
}

const SearchPageTitle: React.FC<SearchPageTitleProps> = ({
    title,
    description,
}) => {
    return (
        <div>
            <header>
                <h2 className="text-base font-semibold">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </header>
        </div>
    );
};

export default SearchPageTitle;
