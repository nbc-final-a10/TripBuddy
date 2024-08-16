'use client';

import DateSearchButton from '@/components/atoms/search/DateSearchButton';
import LocationSearchButton from '@/components/atoms/search/LocationSearchButton';
import SearchInput from '@/components/atoms/search/SearchInput';
import TopButton from '@/components/atoms/search/TopButton';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import SelectRegions from '@/components/molecules/common/SelectRegion';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchResult from '@/components/molecules/search/SearchResult';
import DateSearchPage from '@/components/organisms/search/DateSearch';
import usePreferTheme from '@/hooks/usePreferTheme';
import useSelectRegion from '@/hooks/useSelectRegion';
import {
    filterAndSortTrips,
    filterAndSortTripsBuddies,
} from '@/utils/search/filterAndSortTrips';
import { Trip, TripWithContract } from '@/types/Trips.types';
import supabase from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
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

// // 쿼리 파라미터 업데이트
// const updateQueryParams = (params: Record<string, string | number | null>) => {
//     const url = new URL(window.location.href);
//     Object.keys(params).forEach(key => {
//         if (params[key] === null || params[key] === '') {
//             // url 쿼리 파라미터에서 해당 키 삭제
//             url.searchParams.delete(key);
//         } else {
//             url.searchParams.set(key, params[key].toString());
//         }
//     });
//     // 브라우저 히스토리에 새로운 url 추가
//     window.history.replaceState({}, '', url.toString());
// };

export default function SearchPageContainer() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchInput, setSearchInput] = useState<string>('');

    const {
        startDateTimestamp,
        setStartDateTimestamp,
        endDateTimestamp,
        setEndDateTimestamp,
    } = useDateRange(searchParams);

    const { handleThirdLevelClick, thirdLevelLocation } =
        useLocationSelection(searchParams);

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
    const [resultItems, setResultItems] = useState<TripWithContract[]>([]);
    const [allItems, setAllItems] = useState<TripWithContract[]>([]);
    const [visibleFirstItems, setVisibleFirstItems] = useState(8);
    const [visibleSecondItems, setVisibleSecondItems] = useState(6);
    const resultRef = useRef<HTMLDivElement>(null);
    const [isXL, setIsXL] = useState<boolean>(false);

    const [PreferTripTheme] = usePreferTheme({ mode: 'trip' });
    const [PreferBuddyTheme] = usePreferTheme({ mode: 'buddy' });

    // const [searchParams, setSearchParams] = useState(new URLSearchParams());

    // // 쿼리 파라미터로 location 가져오기
    // useEffect(() => {
    //     const urlSearchParams = new URLSearchParams(window.location.search);

    //     setSearchParams(urlSearchParams);
    // }, []);

    // useEffect(() => {
    //     const location = searchParams.get('location') || null;
    //     if (location) {
    //         handleThirdLevelClick(location);
    //         console.log('위치 선택 데이터: ', location);
    //     } else {
    //         console.log('파라미터 안옴');
    //     }
    // }, [searchParams, handleThirdLevelClick]);

    // // 쿼리 파라미터로 date 가져오기
    // useEffect(() => {
    //     const startDate = searchParams.get('startDate');
    //     const endDate = searchParams.get('endDate');
    //     if (startDate && endDate) {
    //         setStartDateTimestamp(startDate);
    //         setEndDateTimestamp(endDate);
    //     }
    // }, [searchParams]);

    // useEffect(() => {
    //     const handleResize = () => {
    //         // setIsXL(window.matchMedia('(min-width: 1280px').matches);
    //     };

    //     handleResize();
    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    // useEffect(() => {
    //     const arraysAreEqual = (arr1: string[], arr2: string[]) =>
    //         arr1.length === arr2.length &&
    //         arr1.every((value, index) => value === arr2[index]);

    //     if (!arraysAreEqual(selectedThemes, localSelectedThemes)) {
    //         setLocalSelectedThemes(selectedThemes);
    //     }
    // }, [selectedThemes, localSelectedThemes]);

    // useEffect(() => {
    //     const arraysAreEqual = (arr1: string[], arr2: string[]) =>
    //         arr1.length === arr2.length &&
    //         arr1.every((value, index) => value === arr2[index]);

    //     if (!arraysAreEqual(selectedBuddyThemes, localSelectedBuddyThemes)) {
    //         setLocalSelectedBuddyThemes(selectedBuddyThemes);
    //     }
    // }, [selectedBuddyThemes, localSelectedBuddyThemes]);

    // // const handleDateChange = (start: string, end: string) => {
    // //     setStartDateTimestamp(start);
    // //     setEndDateTimestamp(end);
    // // };

    const handleShowResult = async () => {
        // 필터 리셋
        setSearchInput('');
        setStartDateTimestamp('');
        setEndDateTimestamp('');
        handleThirdLevelClick('');
        setSelectedGender(null);
        setStartAge(20);
        setEndAge(70);
        setSelectedMeetingPlace(null);

        // updateQueryParams({
        //     searchInput: '',
        //     gender: null,
        //     startAge: 20,
        //     endAge: 70,
        //     meetingPlace: null,
        //     location: null,
        //     startDate: '',
        //     endDate: '',
        //     themes: '',
        //     buddyThemes: '',
        // });

        // 데이터 가져와서 상태 업데이트
        const { data, error } = await supabase.from('trips').select('*');
        if (error) {
            console.error('Error fetching trips:', error.message);
            return;
        }

        // if (searchInput) {
        //     filteredItems = filteredItems.filter(
        //         (item: Trip) =>
        //             item.trip_title
        //                 .toLowerCase()
        //                 .includes(searchInput.toLowerCase()) ||
        //             item.trip_content
        //                 .toLowerCase()
        //                 .includes(searchInput.toLowerCase()),
        //     );
        // }

        setResultItems(data as TripWithContract[]);
        // setResultItems(
        //     filteredItems.length > 0 ? filteredItems : (data as TripWithContract[]),
        // );
        // setResultItems(filteredItems as TripWithContract[]);
        setAllItems(data as TripWithContract[]);
        setShowResult(true);

        // 아무런 필터 조건이 걸려있지 않을 때
        if (
            !searchInput &&
            !selectedGender &&
            !selectedMeetingPlace &&
            startAge === 20 &&
            endAge === 70 &&
            !thirdLevelLocation &&
            !startDateTimestamp &&
            !endDateTimestamp &&
            selectedTripThemes.length === 0 &&
            selectedBuddyThemes.length === 0
        ) {
            setVisibleFirstItems(data.length);
        }

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

    // url 파라미터 초기 상태 설정
    useEffect(() => {
        const params = searchParams;

        // // searchInput 상태 업데이트
        // const newSearchInput = params.get('searchInput') || '';
        // setSearchInput(prev =>
        //     newSearchInput !== prev ? newSearchInput : prev,
        // );

        // // gender 상태 업데이트
        // const newGender = params.get('gender') || null;
        // setSelectedGender(prev => (newGender !== prev ? newGender : prev));

        // // startAge 상태 업데이트
        // const newStartAge = Number(params.get('startAge')) || 20;
        // setStartAge(prev => (newStartAge !== prev ? newStartAge : prev));

        // // endAge 상태 업데이트
        // const newEndAge = Number(params.get('endAge')) || 70;
        // setEndAge(prev => (newEndAge !== prev ? newEndAge : prev));

        // // meetingPlace 상태 업데이트
        // const newMeetingPlace = params.get('meetingPlace') || null;
        // setSelectedMeetingPlace(prev =>
        //     newMeetingPlace !== prev ? newMeetingPlace : prev,
        // );

        // // location 상태 업데이트 및 actions 호출
        // const newLocation = params.get('location') || '';
        // if (newLocation !== thirdLevelLocation) {
        //     handleThirdLevelClick(newLocation);
        // }

        // // startDateTimestamp 상태 업데이트
        // const newStartDate = params.get('startDate') || '';
        // setStartDateTimestamp(prev =>
        //     newStartDate !== prev ? newStartDate : prev,
        // );

        // // endDateTimestamp 상태 업데이트
        // const newEndDate = params.get('endDate') || '';
        // setEndDateTimestamp(prev => (newEndDate !== prev ? newEndDate : prev));

        // // themes 상태 업데이트
        // const newThemes = params.getAll('themes') || [];
        // setSelectedThemes(prev =>
        //     newThemes.toString() !== prev.toString() ? newThemes : prev,
        // );

        // // buddyThemes 상태 업데이트
        // const newBuddyThemes = params.getAll('buddyThemes') || [];
        // setSelectedBuddyThemes(prev =>
        //     newBuddyThemes.toString() !== prev.toString()
        //         ? newBuddyThemes
        //         : prev,
        // );

        // setSearchInput(params.get('searchInput') || '');
        // setSelectedGender(params.get('gender') || null);
        // setStartAge(Number(params.get('startAge')) || 20);
        // setEndAge(Number(params.get('endAge')) || 70);
        // setSelectedMeetingPlace(params.get('meetingPlace') || null);
        // const newLocation = params.get('location') || '';
        // if (newLocation !== thirdLevelLocation) {
        //     handleThirdLevelClick(newLocation);
        // }
        // setStartDateTimestamp(params.get('startDate') || '');
        // setEndDateTimestamp(params.get('endDate') || '');
        // setSelectedThemes(params.getAll('themes') || []);
        // setSelectedBuddyThemes(params.getAll('buddyThemes') || []);
    }, [searchParams, thirdLevelLocation, handleThirdLevelClick]);

    // // 상태가 변경될 때 URL 업데이트
    // useEffect(() => {
    //     updateQueryParams({
    //         searchInput,
    //         gender: selectedGender,
    //         startAge,
    //         endAge,
    //         meetingPlace: selectedMeetingPlace,
    //         location: thirdLevelLocation,
    //         startDate: startDateTimestamp,
    //         endDate: endDateTimestamp,
    //         themes: selectedThemes.join(', '),
    //         buddyThemes: selectedBuddyThemes.join(', '),
    //     });
    // }, [
    //     searchInput,
    //     selectedGender,
    //     startAge,
    //     endAge,
    //     selectedMeetingPlace,
    //     thirdLevelLocation,
    //     startDateTimestamp,
    //     endDateTimestamp,
    //     selectedThemes,
    //     selectedBuddyThemes,
    // ]);

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
                    // handleThemesButtonClick();
                }}
            >
                검색 결과 보기
            </button>

            {showResult && (
                <div ref={resultRef}>
                    <SearchResult
                        items={resultItems}
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

// const updateQueryParams = (params: {
//     searchInput: string;
//     gender: string | null;
//     startAge: number;
//     endAge: number;
//     meetingPlace: string | null;
//     location: string;
//     startDate: string;
//     endDate: string;
//     themes: string[];
//     buddyThemes: string[];
// }) => {
//     const {
//         searchInput,
//         gender,
//         startAge,
//         endAge,
//         meetingPlace,
//         location,
//         startDate,
//         endDate,
//         themes,
//         buddyThemes,
//     } = params;

//     const queryParams = new URLSearchParams();

//     if (searchInput) queryParams.set('searchInput', searchInput);
//     if (gender) queryParams.set('gender', gender);
//     if (startAge) queryParams.set('startAge', startAge.toString());
//     if (endAge) queryParams.set('endAge', endAge.toString());
//     if (meetingPlace) queryParams.set('meetingPlace', meetingPlace);
//     if (location) queryParams.set('location', location);
//     if (startDate) queryParams.set('startDate', startDate);
//     if (endDate) queryParams.set('endDate', endDate);
//     if (themes.length > 0) queryParams.set('themes', themes.join(','));
//     if (buddyThemes.length > 0)
//         queryParams.set('buddyThemes', buddyThemes.join(','));

//     Router.push(`/search?${queryParams.toString()}`);
// };

// if (buddyCounts !== null) {
//     filteredItems = filteredItems.filter(
//         (item: Trip) => item.trip_max_buddies_counts === buddyCounts,
//     );
// }

{
    /* <div className="my-10">
                <SearchPageTitle
                    title="인원수"
                    description="인원수 최대 4명까지 가능해요."
                />
                <SelectBuddyCounts
                // buddyCounts={buddyCounts}
                // setBuddyCounts={SelectBuddyCounts}
                />
            </div> */
}

{
    /* <div className="my-10">
                <SearchPageTitle
                    title="여행지를 선택해주세요."
                    description="지역, 국가, 도시를 1개 선택해주세요."
                />
                <SelectRegions states={states} actions={actions} />
            </div>
            <div className="my-10" id="date-section">
                <SearchPageTitle
                    title="언제 떠나시나요?"
                    description="버디즈와 함께 여행하고 싶은 날짜를 선택해주세요."
                />
                <DateSearchPage setDateChange={handleDateChange} />
            </div> */
}
