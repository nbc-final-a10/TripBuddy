'use client';

import DateSearchButton from '@/components/atoms/search/DateSearchButton';
import LocationSearchButton from '@/components/atoms/search/LocationSearchButton';
import SearchInput from '@/components/atoms/search/SearchInput';
import TopButton from '@/components/atoms/search/TopButton';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchPageTitle from '@/components/molecules/search/SearchPageTitle';
import SearchResult from '@/components/molecules/search/SearchResult';
import DateSearchPage from '@/components/organisms/search/DateSearch';
import usePreferTheme from '@/hooks/usePreferTheme';
// import useSelectBuddyCounts from '@/hooks/useSelectBuddyCounts';
import useSelectRegion from '@/hooks/useSelectRegion';
import { Tables } from '@/types/supabase';
import {
    filterAndSortTrips,
    filterAndSortTripsBuddies,
} from '@/utils/search/filterAndSortTrips';
import supabase from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Trip = Tables<'trips'>;

// 쿼리 파라미터 업데이트
const updateQueryParams = (params: Record<string, string | number | null>) => {
    const url = new URL(window.location.href);
    Object.keys(params).forEach(key => {
        if (params[key] === null) {
            // url 쿼리 파라미터에서 해당 키 삭제
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, params[key].toString());
        }
    });
    // 브라우저 히스토리에 새로운 url 추가
    window.history.pushState({}, ', url.toString()');
};

export default function SearchPage() {
    const [showResult, setShowResult] = useState(false);
    const [resultItems, setResultItems] = useState<Trip[]>([]);
    const [allItems, setAllItems] = useState<Trip[]>([]);
    const [visibleFirstItems, setVisibleFirstItems] = useState(8);
    const [visibleSecondItems, setVisibleSecondItems] = useState(6);
    const resultRef = useRef<HTMLDivElement>(null);
    const [isXL, setIsXL] = useState<boolean>(false);

    const [searchInput, setSearchInput] = useState<string>('');

    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const [startAge, setStartAge] = useState<number>(18);
    const [endAge, setEndAge] = useState<number>(150);

    // const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts();

    const [selectedMeetingPlace, setSelectedMeetingPlace] = useState<
        string | null
    >(null);

    const { SelectRegion, thirdLevelLocation, setThirdLevelLocation } =
        useSelectRegion();

    const [startDateTimestamp, setStartDateTimestamp] = useState<string>('');
    const [endDateTimestamp, setEndDateTimestamp] = useState<string>('');

    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [selectedBuddyThemes, setSelectedBuddyThemes] = useState<string[]>(
        [],
    );

    const [localSelectedThemes, setLocalSelectedThemes] = useState<string[]>(
        [],
    );
    const [localSelectedBuddyThemes, setLocalSelectedBuddyThemes] = useState<
        string[]
    >([]);

    const [PreferTripTheme] = usePreferTheme({ mode: 'trip' });
    const [PreferBuddyTheme] = usePreferTheme({ mode: 'buddy' });

    const router = useRouter();
    const [searchParams, setSearchParams] = useState(new URLSearchParams());
    // const searchParams = useSearchParams();

    // 쿼리 파라미터로 location 가져오기
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);

        setSearchParams(urlSearchParams);
    }, []);

    useEffect(() => {
        const location = searchParams.get('location');
        if (location) {
            setThirdLevelLocation(location);
            console.log('위치 선택 데이터 왔나: ', location);
        } else {
            console.log('데이터 안옴');
        }
    }, [searchParams, setThirdLevelLocation]);

    // 쿼리 파라미터로 date 가져오기
    useEffect(() => {
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        if (startDate && endDate) {
            setStartDateTimestamp(startDate);
            setEndDateTimestamp(endDate);
        }
    }, [searchParams]);

    useEffect(() => {
        const handleResize = () => {
            setIsXL(window.matchMedia('(min-width: 1280px').matches);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setLocalSelectedThemes(selectedThemes);
    }, [selectedThemes]);

    useEffect(() => {
        setLocalSelectedBuddyThemes(selectedBuddyThemes);
    }, [selectedBuddyThemes]);

    // const handleDateChange = (start: string, end: string) => {
    //     setStartDateTimestamp(start);
    //     setEndDateTimestamp(end);
    // };

    const formatDate = (date: Date) => {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[date.getDay()];
        return `${date.getFullYear().toString().slice(-2)}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}(${dayOfWeek})`;
    };

    const getTodayDate = () => {
        const today = new Date();
        return formatDate(today);
    };

    const formattedStartDate = startDateTimestamp
        ? formatDate(new Date(startDateTimestamp))
        : getTodayDate();
    const formattedEndDate = endDateTimestamp
        ? formatDate(new Date(endDateTimestamp))
        : getTodayDate();

    const handleShowResult = async () => {
        // 데이터 가져와서 상태 업데이트
        const { data, error } = await supabase.from('trips').select('*');
        if (error) {
            console.error('Error fetching trips:', error.message);
            return;
        }

        let filteredItems = data as Trip[];

        if (searchInput) {
            filteredItems = filteredItems.filter(
                (item: Trip) =>
                    item.trip_title
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                    item.trip_content
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()),
            );
        }

        if (selectedGender) {
            filteredItems = filteredItems.filter(
                (item: Trip) => item.trip_wanted_sex === selectedGender,
            );
        }

        if (selectedMeetingPlace) {
            filteredItems = filteredItems.filter(
                (item: Trip) =>
                    item.trip_meet_location === selectedMeetingPlace,
            );
        }

        if (startAge !== undefined && endAge !== undefined) {
            filteredItems = filteredItems.filter(
                (item: Trip) =>
                    item.trip_start_age >= startAge &&
                    item.trip_end_age <= endAge,
            );
        }

        // if (buddyCounts !== null) {
        //     filteredItems = filteredItems.filter(
        //         (item: Trip) => item.trip_max_buddies_counts === buddyCounts,
        //     );
        // }

        if (thirdLevelLocation !== null) {
            filteredItems = filteredItems.filter((item: Trip) =>
                item.trip_final_destination.includes(
                    thirdLevelLocation as string,
                ),
            );
        }

        if (startDateTimestamp && endDateTimestamp) {
            const startDate = new Date(startDateTimestamp);
            const endDate = new Date(endDateTimestamp);

            filteredItems = filteredItems.filter((item: Trip) => {
                const tripStartDate = new Date(item.trip_start_date);
                const TripEndDate = new Date(item.trip_end_date);

                return tripStartDate <= endDate && TripEndDate >= startDate;
            });
        }

        if (selectedThemes.length > 0) {
            filteredItems = filterAndSortTrips(filteredItems, selectedThemes);
        }
        if (selectedBuddyThemes.length > 0) {
            filteredItems = filterAndSortTripsBuddies(
                filteredItems,
                selectedBuddyThemes,
            );
        }

        setResultItems(filteredItems);

        // 아무런 필터 조건이 걸려있지 않을 때
        if (
            !searchInput &&
            !selectedGender &&
            !selectedMeetingPlace &&
            startAge === 18 &&
            endAge === 150 &&
            !thirdLevelLocation &&
            !startDateTimestamp &&
            !endDateTimestamp &&
            selectedThemes.length === 0 &&
            selectedBuddyThemes.length === 0
        ) {
            setVisibleFirstItems(data.length);
        }

        setAllItems(data as Trip[]);
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
            // resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleThemesButtonClick = () => {
        console.log('전 여정 테마: ', localSelectedThemes);
        console.log('전 버디즈 성향: ', localSelectedBuddyThemes);
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
        setSearchInput(params.get('searchInput') || '');
        setSelectedGender(params.get('gender') || null);
        setStartAge(Number(params.get('startAge')) || 18);
        setEndAge(Number(params.get('endAge')) || 150);
        setSelectedMeetingPlace(params.get('meetingPlace') || null);
        setThirdLevelLocation(params.get('location') || '');
        setStartDateTimestamp(params.get('startDate') || '');
        setEndDateTimestamp(params.get('endDate') || '');
        setSelectedThemes(params.getAll('themes') || []);
        setSelectedBuddyThemes(params.getAll('buddyThemes') || []);
    }, [searchParams, setThirdLevelLocation]);

    // 상태가 변경될 때 URL 업데이트
    useEffect(() => {
        updateQueryParams({
            searchInput,
            gender: selectedGender,
            startAge,
            endAge,
            meetingPlace: selectedMeetingPlace,
            location: thirdLevelLocation,
            startDate: startDateTimestamp,
            endDate: endDateTimestamp,
            themes: selectedThemes.join(','),
            buddyThemes: selectedBuddyThemes.join(','),
        });
    }, [
        searchInput,
        selectedGender,
        startAge,
        endAge,
        selectedMeetingPlace,
        thirdLevelLocation,
        startDateTimestamp,
        endDateTimestamp,
        selectedThemes,
        selectedBuddyThemes,
    ]);

    // 필터 리셋 핸들러
    const handleFiltersReset = () => {
        setSearchInput('');
        setSelectedGender(null);
        setStartAge(18);
        setEndAge(150);
        setSelectedMeetingPlace(null);
        setThirdLevelLocation('');
        setStartDateTimestamp('');
        setEndDateTimestamp('');
        setSelectedThemes([]);
        setSelectedBuddyThemes([]);
        updateQueryParams({
            searchInput: '',
            gender: null,
            startAge: 18,
            endAge: 150,
            meetingPlace: null,
            location: null,
            startDate: '',
            endDate: '',
            themes: '',
            buddyThemes: '',
        });
    };

    return (
        <main className="p-5 xl:p-0 xl:py-5">
            <section className="flex flex-col mx-auto mb-10 mt-6 gap-[18px] xl:flex-row xl:items-center xl:justify-center xl:max-w-screen-xl xl:gap-5">
                <SearchInput
                    onKeyDown={handleKeyDown}
                    onChange={e => setSearchInput(e.target.value)}
                />

                <LocationSearchButton
                    onClick={() => {}}
                    location={thirdLevelLocation}
                />

                <DateSearchButton
                    defaultStartDate={formattedStartDate}
                    defaultEndDate={formattedEndDate}
                />

                <button
                    className="hidden xl:flex xl:w-[140px] xl:px-4 xl:py-2.5 rounded-xl bg-main-color justify-center items-center mx-auto font-semibold text-white text-sm transition-colors duration-200 ease-in-out active:bg-gray-300 whitespace-nowrap"
                    onClick={handleShowResult}
                >
                    검색하기
                </button>
            </section>

            <div className="my-10">
                <SearchPageTitle title="성별" description="" />
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
            {/* <div className="my-10">
                <SearchPageTitle
                    title="인원수"
                    description="인원수 최대 4명까지 가능해요."
                />
                <SelectBuddyCounts
                // buddyCounts={buddyCounts}
                // setBuddyCounts={SelectBuddyCounts}
                />
            </div> */}
            <div className="my-10">
                <SearchPageTitle title="만남 장소" description="" />
                <MeetingPlaceChipGroup
                    selectedMeetingPlace={selectedMeetingPlace}
                    setSelectedMeetingPlace={setSelectedMeetingPlace}
                />
            </div>
            {/* <div className="my-10">
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
                <DateSearchPage setDateChange={handleDateChange} />
            </div> */}
            <div className="my-10">
                <SearchPageTitle
                    title="여정 테마"
                    description="3가지를 선택해주세요."
                />
                <PreferTripTheme
                    className="some-class"
                    setSelectedTheme={setSelectedThemes}
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
                className="flex justify-center items-center mx-auto w-full px-28 h-12 rounded-2xl bg-main-color font-semibold text-white text-sm m-3 mb-5 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-[348px] xl:mt-8"
                onClick={handleFiltersReset}
            >
                검색 옵션 리셋하기
            </button>

            <button
                id="result-section"
                className="flex justify-center items-center mx-auto w-full px-28 h-12 rounded-2xl bg-main-color font-semibold text-white text-sm m-3 mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-[348px] xl:mt-8"
                onClick={() => {
                    handleShowResult();
                    handleThemesButtonClick();
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
        </main>
    );
}
