import React from 'react';

type SearchPageTitleProps = {
    title: string;
    description: string;
};

const SearchPageTitle: React.FC<SearchPageTitleProps> = ({
    title,
    description,
}) => {
    return (
        <header className="mt-2 mb-6">
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
        </header>
    );
};

export default SearchPageTitle;
