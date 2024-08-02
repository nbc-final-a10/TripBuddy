import React, { useRef } from 'react';
import SearchPageTitle from './SearchPageTitle';
import { Tables } from '@/types/supabase';
import HomePageTrips from '../homepage/HomePageTrips';
import useTapScroll from '@/hooks/useTapScroll';
import { Trip } from '@/types/Trips.types';

// type Trip = Tables<'trips'>;

type SearchResultProps = {
    items: Trip[];
    allTrips: Trip[];
    visibleFirstItems: number;
    visibleSecondItems: number;
    loadMoreFirstItems: () => void;
    loadMoreSecondItems: () => void;
};

const SearchResult: React.FC<SearchResultProps> = ({
    items,
    allTrips,
    visibleFirstItems,
    visibleSecondItems,
    loadMoreFirstItems,
    loadMoreSecondItems,
}) => {
    const tripsRef = useRef<HTMLDivElement>(null);
    const { createMouseDownHandler } = useTapScroll();

    // console.log('items:', items);
    // console.log('visibleSecondItems: ', visibleSecondItems);

    const filteredItems = items.slice(0, visibleFirstItems);

    // 최신 등록순으로 정렬
    const sortItems = [...allTrips].sort((a, b) => {
        return (
            new Date(b.trip_created_at).getTime() -
            new Date(a.trip_created_at).getTime()
        );
    });

    console.log('sortItems: ', sortItems);

    return (
        <>
            <section className="my-10">
                {filteredItems.length === 0 ? (
                    <div>
                        <p className="flex justify-center items-center mx-auto">
                            아쉽게도 일치하는 여정 결과가 없어요
                        </p>
                    </div>
                ) : (
                    <div
                        className="overflow-x-scroll scrollbar-hidden flex gap-[10px]"
                        ref={tripsRef}
                        onMouseDown={createMouseDownHandler(tripsRef)}
                    >
                        <HomePageTrips trips={filteredItems} />
                    </div>
                )}

                {visibleFirstItems < filteredItems.length && (
                    <button
                        className="mt-4 px-4 py-2 bg-main-color text-white rounded-2xl text-sm mx-auto block hidden xl:block"
                        onClick={loadMoreFirstItems}
                    >
                        더보기
                    </button>
                )}
            </section>

            <section className="mt-16 xl:mt-24">
                <SearchPageTitle
                    title="여행자님, 이런 여정은 어떠세요?"
                    description="모집 마감이 얼마 남지 않은 여정들이에요"
                />

                <ul className="grid grid-cols-1 gap-1 mt-8 xl:grid-cols-3 xl:gap-2 xl:w-full">
                    {sortItems
                        .slice(0, visibleSecondItems)
                        .map((item, index) => (
                            <li
                                key={index}
                                className="shadow-md w-[335px] h-[93px] rounded-[11px] mx-auto mb-6 xl:mx-0 xl:w-full xl:h-[120px] p-3"
                            >
                                <div className="cursor-pointer flex items-center h-full">
                                    <div className="bg-gray-200 rounded-lg w-[60px] h-[60px]"></div>
                                    <div className="flex flex-col justify-between w-[218px] ml-8">
                                        <p className="font-semibold truncate">
                                            {item.trip_title}
                                        </p>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="truncate max-w-[calc(100%-70px)]">
                                                {item.trip_content}
                                            </p>
                                            <span>{`${item.trip_max_buddies_counts}/4`}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
                {visibleSecondItems < sortItems.length && (
                    <button
                        className="mt-4 px-4 py-2 bg-main-color text-white rounded-2xl text-sm mx-auto block"
                        onClick={loadMoreSecondItems}
                    >
                        더보기
                    </button>
                )}
            </section>
        </>
    );
};

export default SearchResult;
