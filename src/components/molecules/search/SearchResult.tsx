import React, { useState } from 'react';
import SearchPageTitle from './SearchPageTitle';

type SearchResultProps = {
    items: number[];
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
    return (
        <>
            <section className="my-5">
                <h3 className="text-base font-semibold py-4 my-3">
                    여정 검색 결과
                </h3>

                <div className="flex flex-nowrap whitespace-nowrap overflow-x-auto scrollbar-hidden gap-4 xl:grid xl:grid-cols-4 xl:auto-cols-[minmax(0,1fr)]">
                    {items.slice(0, visibleFirstItems).map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-300 w-[178px] h-[176px] rounded-lg flex-shrink-0 xl:w-[250px] xl:h-[250px]"
                        ></div>
                    ))}
                </div>
                {visibleFirstItems < items.length && (
                    <button
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg mx-auto block hidden xl:block"
                        onClick={loadMoreFirstItems}
                    >
                        더보기
                    </button>
                )}
            </section>

            <section className="mt-10 xl:mt-24">
                <SearchPageTitle
                    title="이런 여정은 어떠세요?"
                    description="모집 마감이 얼마 남지 않은 여정들이에요!"
                />

                <ul className="grid grid-cols-1 gap-1 xl:grid-cols-3 xl:gap-2 xl:w-full">
                    {items.slice(0, visibleSecondItems).map((item, index) => (
                        <li
                            key={index}
                            className="bg-gray-300 w-[335px] h-[93px] rounded-[11px] mx-auto mb-6 xl:mx-0 xl:w-full xl:h-[120px]"
                        ></li>
                    ))}
                </ul>
                {visibleSecondItems < items.length && (
                    <button
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg mx-auto block"
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
