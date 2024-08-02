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
import { Tables } from '@/types/supabase';
import supabase from '@/utils/supabase/client';
import React, { useRef, useState } from 'react';

type Trip = Tables<'trips'>;

const SearchPage: React.FC = () => {
    const [showResult, setShowResult] = useState(false);
    const [resultItems, setResultItems] = useState<Trip[]>([]);
    const [allItems, setAllItems] = useState<Trip[]>([]);
    const [visibleFirstItems, setVisibleFirstItems] = useState(8);
    const [visibleSecondItems, setVisibleSecondItems] = useState(6);
    const resultRef = useRef<HTMLDivElement>(null);

    const [searchInput, setSearchInput] = useState<string>('');

    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const [startAge, setStartAge] = useState<number>(18);
    const [endAge, setEndAge] = useState<number>(150);

    const { buddyCounts, SelectBuddyCounts } = useSelectBuddyCounts();

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

    const [PreferTripTheme] = usePreferTheme({ mode: 'trip' });
    const [PreferBuddyTheme] = usePreferTheme({ mode: 'buddy' });

    const handleDateChange = (start: string, end: string) => {
        setStartDateTimestamp(start);
        setEndDateTimestamp(end);
    };

    const handleShowResult = async () => {
        // 데이터 가져와서 상태 업데이트
        const { data, error } = await supabase.from('trips').select('*');
        if (error) {
            console.error('Error fetching trips:', error.message);
            return;
        }

        // setAllItems(data as Trip[]);
        setResultItems(data as Trip[]);
        setAllItems(data as Trip[]);

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

        if (buddyCounts !== null) {
            filteredItems = filteredItems.filter(
                (item: Trip) => item.trip_max_buddies_counts === buddyCounts,
            );
        }

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
            filteredItems = filteredItems.filter((item: Trip) => {
                const themes = [
                    item.trip_theme1,
                    item.trip_theme2,
                    item.trip_theme3,
                ];
                return selectedThemes.every(theme => themes.includes(theme));
            });
        }

        if (selectedBuddyThemes.length > 0) {
            filteredItems = filteredItems.filter((item: Trip) => {
                const buddyThemes = [
                    item.trip_wanted_buddies1,
                    item.trip_wanted_buddies2,
                    item.trip_wanted_buddies3,
                ];
                return selectedBuddyThemes.every(theme =>
                    buddyThemes.includes(theme),
                );
            });
        }

        setResultItems(filteredItems);
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

    const loadMoreFirstItems = () => {
        setVisibleFirstItems(prev => prev + 8);
    };

    const loadMoreSecondItems = () => {
        setVisibleSecondItems(prev => prev + 6);
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
                        onChange={e => setSearchInput(e.target.value)}
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
                <SearchPageTitle
                    title="인원수"
                    description="인원수 최대 4명까지 가능해요."
                />
                <SelectBuddyCounts
                // buddyCounts={buddyCounts}
                // setBuddyCounts={SelectBuddyCounts}
                />
            </div>
            <div className="my-10">
                <SearchPageTitle title="만남 장소" description="" />
                <MeetingPlaceChipGroup
                    selectedMeetingPlace={selectedMeetingPlace}
                    setSelectedMeetingPlace={setSelectedMeetingPlace}
                />
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
                <DateSearchPage setDateChange={handleDateChange} />
            </div>
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
                className="flex justify-center items-center mx-auto w-full px-28 py-2 rounded-2xl bg-main-color font-semibold text-white text-sm m-3 mb-10 transition-colors duration-200 ease-in-out active:bg-gray-300 xl:w-1/2 xl:mt-8"
                onClick={handleShowResult}
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
                    />
                </div>
            )}

            <TopButton />
        </main>
    );
};

export default SearchPage;
