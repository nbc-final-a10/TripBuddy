'use client';

import DateSearchPage from '@/components/organisms/search/DateSearchPage';
import LocationSearchPage from '@/components/organisms/search/LocationSearchPage';
import SearchMainPage from '@/components/organisms/search/SearchMainPage';
import SearchResultPage from '../searchResult/page';
import React from 'react';
import useStore from '@/app/store';

const SearchPage: React.FC = () => {
    const { currentPage, setCurrentPage } = useStore();

    return (
        <>
            <section className="items-center">
                <div>
                    {currentPage === 'main' && <SearchMainPage />}
                    {currentPage === 'location' && (
                        <LocationSearchPage
                            onBack={() => setCurrentPage('main')}
                        />
                    )}
                    {currentPage === 'date' && (
                        <DateSearchPage onBack={() => setCurrentPage('main')} />
                    )}
                    {currentPage === 'result' && <SearchResultPage />}
                </div>
            </section>
        </>
    );
};

export default SearchPage;
