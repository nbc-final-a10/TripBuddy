'use client';

import DateSearchPage from '@/components/organisms/search/DateSearchPage';
import LocationSearchPage from '@/components/organisms/search/LocationSearchPage';
import SearchMainPage from '@/components/organisms/search/SearchMainPage';
import React, { useState } from 'react';

const SearchPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState('main');

    const handleLocationSearch = () => {
        setCurrentPage('location');
    };

    const handleDateSearch = () => {
        setCurrentPage('date');
    };

    const handleBackToMain = () => {
        setCurrentPage('main');
    };

    return (
        <>
            <section className="items-center">
                <div>
                    {currentPage === 'main' && (
                        <SearchMainPage
                            onLocationSearch={handleLocationSearch}
                            onDateSearch={handleDateSearch}
                        />
                    )}
                    {currentPage === 'location' && (
                        <LocationSearchPage onBack={handleBackToMain} />
                    )}
                    {currentPage === 'date' && (
                        <DateSearchPage onBack={handleBackToMain} />
                    )}
                </div>
            </section>
        </>
    );
};

export default SearchPage;
