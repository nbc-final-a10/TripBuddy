'use client';

import TopButton from '@/components/atoms/search/TopButton';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import SearchResult from '@/components/molecules/search/SearchResult';
import DateSearchPage from '@/components/organisms/search/DateSearchPage';
import usePreferTheme from '@/hooks/usePreferTheme';
import useSelectBuddyCounts from '@/hooks/useSelectBuddyCounts';
import useSelectRegion from '@/hooks/useSelectRegion';
import supabase from '@/utils/supabase/client';
import { useSearchStore } from '@/zustand/search.store';
// import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const SearchPage: React.FC = () => {
    const [showResult, setShowResult] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const {
        startAge,
        endAge,
        setStartAge,
        setEndAge,

        // buddyCount,
        // setBuddyCount,

        // setThirdLevelLocation,
    } = useSearchStore(
        useShallow(state => ({
            startAge: state.startAge,
            endAge: state.endAge,
            setStartAge: state.setStartAge,
            setEndAge: state.setEndAge,

            // buddyCount: state.buddyCount,
            // setBuddyCount: state.setBuddyCount,

            // setThirdLevelLocation: state.setThirdLevelLocation,
        })),
    );

    // const { startAge, endAge } = useSearchStore(state => ({
    //     startAge: state.startAge,
    //     endAge: state.endAge,
    // }));

    const [PreferBuddyTheme] = usePreferTheme({
        mode: 'buddy',
    });

    const [PreferTripTheme, selectedTripThemes] = usePreferTheme({
        mode: 'trip',
    });

    const { SelectBuddyCounts } = useSelectBuddyCounts();
    const { SelectRegion, thirdLevelLocation } = useSelectRegion();
    // console.log('Third Level Location:', thirdLevelLocation);

    // const router = useRouter();

    const { setItems, setSelectedThemes } = useSearchStore(state => ({
        setItems: state.setItems,
        setSelectedThemes: state.setSelectedThemes,
    }));

    const handleShowResult = async () => {
        // 데이터 가져와서 상태 업데이트
        const { data, error } = await supabase.from('trips').select('*');
        if (error) {
            console.error('Error fetching trips:', error.message);
        } else {
            setItems(data);
        }

        setSelectedThemes(selectedTripThemes);

        setShowResult(true);
        // 속도 지연
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // enter 누르면 검색 결과 보여주기
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleShowResult();
        }
    };

    return (
        <main className="p-5 xl:p-0 xl:py-5">
            <section className="flex flex-col mx-auto mb-10 mt-6 xl:flex-row xl:items-center xl:justify-center xl:max-w-screen-xl">
                <div className="flex xl:flex-grow items-center">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="w-full bg-gray-100 p-2 rounded-2xl"
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <button
                    className="hidden xl:flex xl:px-4 xl:py-2.5 xl:w-36 xl:ml-6 rounded-2xl bg-main-color justify-center items-center mx-auto font-semibold text-white text-sm transition-colors duration-200 ease-in-out active:bg-gray-300"
                    onClick={handleShowResult}
                >
                    검색 결과 보기
                </button>
            </section>

            <div className="my-10">
                <SearchPageTitle title="성별" description="" />
                <GenderChipGroup />
            </div>
            <div className="my-10">
                <SearchPageTitle title="나이" description="" />
                <SelectAgesRange
                    startAge={startAge}
                    endAge={endAge}
                    handleStartAge={setStartAge}
                    handleEndAge={setEndAge}
                />
            </div>
            <div className="my-10">
                <SearchPageTitle
                    title="인원수"
                    description="인원수 최대 4명까지 가능해요."
                />
                <SelectBuddyCounts />
            </div>
            <div className="my-10">
                <SearchPageTitle title="만남 장소" description="" />
                <MeetingPlaceChipGroup />
            </div>
            <div className="my-10">
                <SearchPageTitle
                    title="여행지를 선택해주세요."
                    description="지역, 국가, 도시를 1개 선택해주세요."
                />
                <SelectRegion />
            </div>
            <div className="my-10" id="date-section">
                <SearchPageTitle
                    title="언제 떠나시나요?"
                    description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
                />
                <DateSearchPage />
            </div>
            <div className="my-10">
                <SearchPageTitle
                    title="여정 테마"
                    description="3가지를 선택해주세요."
                />
                <PreferTripTheme />
            </div>
            <div className="my-10">
                <SearchPageTitle
                    title="버디즈 성향"
                    description="3가지를 선택해주세요."
                />
                <PreferBuddyTheme />
            </div>

            <button
                className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-2xl bg-main-color font-semibold text-white text-sm m-3 mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-1/2 xl:mt-8"
                onClick={handleShowResult}
            >
                검색 결과 보기
            </button>

            {showResult && (
                <div ref={resultRef}>
                    <SearchResult />
                </div>
            )}

            <TopButton />
        </main>
    );
};

export default SearchPage;
