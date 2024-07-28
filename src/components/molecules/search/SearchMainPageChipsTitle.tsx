import React from 'react';

type SearchPageChipsTitleProps = {
    title: string;
    limit: string;
};

const SearchPageChipsTitle: React.FC<SearchPageChipsTitleProps> = ({
    title,
    limit,
}) => {
    return (
        <header>
            <h2 className="text-base font-semibold">{title}</h2>
            <p className="text-sm text-gray-500">{limit}</p>
        </header>
    );
};

export default SearchPageChipsTitle;
