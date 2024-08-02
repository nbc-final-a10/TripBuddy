import React, { useRef } from 'react';
import SearchPageTitle from './SearchPageTitle';
import { Tables } from '@/types/supabase';
import HomePageTrips from '../homepage/HomePageTrips';
import useTapScroll from '@/hooks/useTapScroll';
import { Trip } from '@/types/Trips.types';

// type Trip = Tables<'trips'>;

type SearchResultProps = {
    items: Trip[];
    visibleFirstItems: number;
    visibleSecondItems: number;
    loadMoreFirstItems: () => void;
    loadMoreSecondItems: () => void;
};

const SearchResult: React.FC<SearchResultProps> = ({
    items,
    visibleFirstItems,
    visibleSecondItems,
    loadMoreFirstItems,
    loadMoreSecondItems,
}) => {
    const tripsRef = useRef<HTMLDivElement>(null);
    const { createMouseDownHandler } = useTapScroll();

    if (items.length === 0) {
        return <div>검색 결과가 없습니다.</div>;
    }

    console.log('검색된 여정: ', items);

    return (
        <>
            <section className="my-5">
                {/* <h3 className="text-lg font-semibold mb-5">여정 검색 결과</h3> */}
                <div
                    className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                    ref={tripsRef}
                    onMouseDown={createMouseDownHandler(tripsRef)}
                >
                    <HomePageTrips trips={items} />
                </div>

                {visibleFirstItems < items.length && (
                    <button
                        className="mt-4 px-4 py-2 bg-main-color text-white rounded-2xl text-sm mx-auto block hidden xl:block"
                        onClick={loadMoreFirstItems}
                    >
                        더보기
                    </button>
                )}
            </section>

            {/* <section className="mt-10 xl:mt-24">
                <SearchPageTitle
                    title="이런 여정은 어떠세요?"
                    description="모집 마감이 얼마 남지 않은 여정들이에요!"
                />

                <ul className="grid grid-cols-1 gap-1 xl:grid-cols-3 xl:gap-2 xl:w-full">
                    {items.slice(0, visibleSecondItems).map((item, index) => (
                        <li
                            key={index}
                            className="shadow-md w-[335px] h-[93px] rounded-[11px] mx-auto mb-6 xl:mx-0 xl:w-full xl:h-[120px]"
                        ></li>
                    ))}
                </ul>
                {visibleSecondItems < items.length && (
                    <button
                        className="mt-4 px-4 py-2 bg-main-color text-white rounded-2xl text-sm mx-auto block"
                        onClick={loadMoreSecondItems}
                    >
                        더보기
                    </button>
                )}
            </section> */}
        </>
    );
};

export default SearchResult;
