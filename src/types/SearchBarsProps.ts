import React from 'react';

export type SearchBarsProps = {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;

    thirdLevelLocation: string | null;
    setThirdLevelLocation: React.Dispatch<React.SetStateAction<string | null>>;

    startDateTimestamp: string;
    setStartDateTimestamp: React.Dispatch<React.SetStateAction<string>>;
    endDateTimestamp: string;
    setEndDateTimestamp: React.Dispatch<React.SetStateAction<string>>;

    handleShowResult: () => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;

    formattedStartDate: string;
    formattedEndDate: string;
};
