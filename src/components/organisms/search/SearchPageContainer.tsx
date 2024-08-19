'use client';

import TopButton from '@/components/atoms/search/TopButton';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchResult from '@/components/molecules/search/SearchResult';
import { TripWithContract } from '@/types/Trips.types';
import React, { useEffect, useRef, useState } from 'react';
import SearchBars from '@/components/molecules/search/SearchBars';
import SearchPageTitle from '@/components/atoms/search/SearchPageTitle';
import { useThemeReducer } from '@/hooks/SearchPage/useThemeReducer';
import {
    useAgeRange,
    useDateRange,
    useGenderSelection,
    useLocationSelection,
    useMeetingPlaceSelection,
} from '@/hooks/SearchPage/useSelectSearchOption';
import { usePreferTheme } from '@/hooks';
import { useUrlParams } from '@/hooks/SearchPage/useSearchParams';
import { useFilteredTrips } from '@/hooks/SearchPage/useFilterSearchOption';

export default function SearchPageContainer() {
    const { params, updateQueryParams } = useUrlParams();

    const [searchInput, setSearchInput] = useState<string>('');

    const {
        startDateTimestamp,
        setStartDateTimestamp,
        endDateTimestamp,
        setEndDateTimestamp,
    } = useDateRange(params);

    const { handleThirdLevelClick, thirdLevelLocation } =
        useLocationSelection(params);

    const { selectedGender, setSelectedGender } = useGenderSelection();

    const { startAge, setStartAge, endAge, setEndAge } = useAgeRange();

    const { selectedMeetingPlace, setSelectedMeetingPlace } =
        useMeetingPlaceSelection();

    const {
        selectedThemes: selectedTripThemes,
        setSelectedThemes: setSelectedTripThemes,
    } = useThemeReducer();

    const {
        selectedThemes: selectedBuddyThemes,
        setSelectedThemes: setSelectedBuddyThemes,
    } = useThemeReducer();

    const [showResult, setShowResult] = useState(false);
    const [visibleFirstItems, setVisibleFirstItems] = useState(8);
    const [visibleSecondItems, setVisibleSecondItems] = useState(6);
    const [resultItems, setResultItems] = useState<TripWithContract[]>([]);
    const [allItems, setAllItems] = useState<TripWithContract[]>([]);
    const resultRef = useRef<HTMLDivElement>(null);
    const [isXL, setIsXL] = useState<boolean>(false);

    const [PreferTripTheme] = usePreferTheme({ mode: 'trip' });
    const [PreferBuddyTheme] = usePreferTheme({ mode: 'buddy' });

    const filters = {
        searchInput,
        startDateTimestamp,
        endDateTimestamp,
        thirdLevelLocation,
        selectedGender,
        startAge,
        endAge,
        selectedMeetingPlace,
        selectedThemes: selectedTripThemes,
        selectedBuddyThemes: selectedBuddyThemes,
    };

    const { resultItems: filteredResultItems, allItems: filteredAllItems } =
        useFilteredTrips(filters);

    // 필터링된 데이터를 상태로 설정
    useEffect(() => {
        setResultItems(filteredResultItems);
        setAllItems(filteredAllItems);
    }, [filteredResultItems, filteredAllItems]);

    useEffect(() => {
        const handleResize = () => {
            const xl = window.matchMedia('(min-width: 1280px').matches;
            setIsXL(xl);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [resultItems.length]);

    const handleShowResult = async () => {
        setShowResult(true);

        // 속도 지연
        // 위에서 offset만큼 떨어진 위치로 스크롤 이동
        setTimeout(() => {
            const offset = 40;
            if (resultRef.current) {
                const top =
                    resultRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }, 100);

        console.log('filters: ', filters);

        // // 필터 리셋
        // setSearchInput('');
        // setStartDateTimestamp('');
        // setEndDateTimestamp('');
        // handleThirdLevelClick('');
        // setSelectedGender(null);
        // setStartAge(20);
        // setEndAge(70);
        // setSelectedMeetingPlace(null);
        // setSelectedTripThemes([]);
        // setSelectedBuddyThemes([]);

        // // 쿼리 파라미터 업데이트
        // updateQueryParams({
        //     searchInput: '',
        //     gender: null,
        //     startAge: 20,
        //     endAge: 70,
        //     meetingPlace: null,
        //     location: null,
        //     startDate: '',
        //     endDate: '',
        //     themes: [],
        //     buddyThemes: [],
        // });
    };

    // enter 누르면 검색 결과 보여주기
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleShowResult();
        }
    };

    const loadMoreFirstItems = () => {
        setVisibleFirstItems(prev => prev + 8);
    };

    const loadMoreSecondItems = () => {
        setVisibleSecondItems(prev => prev + 6);
    };

    const VisibleItems = () => {
        if (showResult) {
            if (isXL) {
                return resultItems.slice(0, visibleFirstItems);
            } else {
                return resultItems;
            }
        }
        return [];
    };

    return (
        <div className="p-5 xl:p-0 xl:py-5 bg-white">
            <SearchBars
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                startDateTimestamp={startDateTimestamp}
                setStartDateTimestamp={setStartDateTimestamp}
                endDateTimestamp={endDateTimestamp}
                setEndDateTimestamp={setEndDateTimestamp}
                thirdLevelLocation={thirdLevelLocation}
                setThirdLevelLocation={handleThirdLevelClick}
                handleShowResult={handleShowResult}
                handleKeyDown={handleKeyDown}
            />
            <div className="my-10">
                <GenderChipGroup
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                />
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
                <MeetingPlaceChipGroup
                    selectedMeetingPlace={selectedMeetingPlace}
                    setSelectedMeetingPlace={setSelectedMeetingPlace}
                />
            </div>

            <div className="my-10">
                <SearchPageTitle
                    title="여정 테마"
                    description="3가지를 선택해주세요."
                />
                <PreferTripTheme
                    className="some-class"
                    setSelectedTheme={setSelectedTripThemes}
                />
            </div>
            <div className="my-10">
                <SearchPageTitle
                    title="버디즈 성향"
                    description="3가지를 선택해주세요."
                />
                <PreferBuddyTheme
                    className="some-class"
                    setSelectedTheme={setSelectedBuddyThemes}
                />
            </div>

            <button
                id="result-section"
                className="flex justify-center items-center mx-auto w-full xl:max-w-[348px] px-28 h-12 rounded-2xl bg-main-color font-semibold text-white text-xl mb-5 xl:mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 whitespace-nowrap"
                onClick={() => {
                    handleShowResult();
                }}
            >
                검색 결과 보기
            </button>

            {showResult && (
                <div ref={resultRef}>
                    <SearchResult
                        items={VisibleItems()}
                        allTrips={allItems}
                        visibleFirstItems={visibleFirstItems}
                        visibleSecondItems={visibleSecondItems}
                        loadMoreFirstItems={loadMoreFirstItems}
                        loadMoreSecondItems={loadMoreSecondItems}
                        isXL={isXL}
                    />
                </div>
            )}

            <TopButton />
        </div>
    );
}
