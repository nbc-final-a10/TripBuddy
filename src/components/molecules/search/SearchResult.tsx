import React from 'react';
import SearchPageTitle from './SearchPageTitle';
import { useSearchStore } from '@/zustand/search.store';

const SearchResult: React.FC = () => {
    const {
        items,
        visibleFirstItems,
        visibleSecondItems,
        loadMoreFirstItems,
        loadMoreSecondItems,
        selectedGender,
    } = useSearchStore(state => ({
        items: state.items,
        visibleFirstItems: state.visibleFirstItems,
        visibleSecondItems: state.visibleSecondItems,
        loadMoreFirstItems: state.loadMoreFirstItems,
        loadMoreSecondItems: state.loadMoreSecondItems,
        selectedGender: state.selectedGender,
    }));

    // // selectedGender에 따라 성별 필터링
    // const GenderFilteredItems = selectedGender
    //     ? items.filter(item => item.trip_wanted_sex === selectedGender)
    //     : items;

    // if (GenderFilteredItems.length === 0) {
    //     return <div>검색 결과가 없습니다.</div>;
    // }

    return (
        <>
            <section className="my-5">
                <h3 className="text-base font-semibold mb-5">여정 검색 결과</h3>

                {/* <div className="flex flex-nowrap whitespace-nowrap overflow-x-auto scrollbar-hidden gap-4 xl:grid xl:grid-cols-4 xl:auto-cols-[minmax(0,1fr)]">
                    {GenderFilteredItems.slice(0, visibleFirstItems).map(
                        (item, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 relative shadow-lg w-[177px] h-[176px] rounded-lg flex-shrink-0 xl:w-[250px] xl:h-[250px] p-3"
                            >
                                <div>
                                    <p className="text-base font-semibold">
                                        {item.trip_title}
                                    </p>
                                </div>
                                <p className="text-sm">
                                    {item.trip_wanted_sex}
                                </p>
                            </div>
                        ),
                    )}
                </div>
                {visibleFirstItems < GenderFilteredItems.length && (
                    <button
                        className="mt-4 px-4 py-2 bg-main-color text-white rounded-2xl text-sm mx-auto block hidden xl:block"
                        onClick={loadMoreFirstItems}
                    >
                        더보기
                    </button>
                )} */}
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
            </section>
        </>
    );
};

export default SearchResult;
