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
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

type Trip = Tables<'trips'>;

const SearchPage: React.FC = () => {
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

    const router = useRouter();
    const [location, setLocation] = useState<string | undefined>(undefined);

    // useEffect(() => {
    //     const { location } = router.query;
    //     if (typeof location === 'string') {
    //         setLocation(location);
    //     }
    // }, [router.query]);

    useEffect(() => {
        console.log('updated selectedThemes: ', selectedThemes);
        setLocalSelectedThemes(selectedThemes);
    }, [selectedThemes]);

    useEffect(() => {
        console.log('updated selectedBuddyThemes: ', selectedBuddyThemes);
        setLocalSelectedBuddyThemes(selectedBuddyThemes);
    }, [selectedBuddyThemes]);

    const handleDateChange = (start: string, end: string) => {
        setStartDateTimestamp(start);
        setEndDateTimestamp(end);
    };

    const handleShowResult = async () => {
        console.log('가져오기 전: ', selectedThemes);

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
        console.log('패칭 후에 selectedThemes: ', selectedThemes);

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
        // 위에서 offset만큼 떨어진 위치로
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

    // 현재 날짜, 다음날 가져오기
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date: Date) => {
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = week[today.getDay()];
        return `${today.getFullYear().toString().slice(-2)}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}(${dayOfWeek})`;
    };

    const formattedStartDate = formatDate(today);
    const formattedEndDate = formatDate(tomorrow);

    return (
        <main className="p-5 xl:p-0 xl:py-5">
            <section className="flex flex-col mx-auto mb-10 mt-6 gap-[18px] xl:flex-row xl:items-center xl:justify-center xl:max-w-screen-xl xl:gap-5">
                <SearchInput
                    onKeyDown={handleKeyDown}
                    onChange={e => setSearchInput(e.target.value)}
                />

                <LocationSearchButton onClick={() => {}} />

                <DateSearchButton
                    startDate={formattedStartDate}
                    endDate={formattedEndDate}
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
};

export default SearchPage;
