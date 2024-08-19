'use client';

import TopButton from '@/components/atoms/search/TopButton';
import SelectAgesRange from '@/components/atoms/write/SelectAgesRange';
import GenderChipGroup from '@/components/molecules/search/GenderChipGroup';
import MeetingPlaceChipGroup from '@/components/molecules/search/MeetingPlaceChipGroup';
import SearchResult from '@/components/molecules/search/SearchResult';
import React, {
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import SearchBars from '@/components/molecules/search/SearchBars';
import SearchPageTitle from '@/components/atoms/search/SearchPageTitle';
import {
    useAgeRange,
    useDateRange,
    useGenderSelection,
    useLocationSelection,
    useMeetingPlaceSelection,
    useSearchInput,
} from '@/hooks/SearchPage/useSelectSearchOption';
import { usePreferTheme } from '@/hooks';
import { useUrlParams } from '@/hooks/SearchPage/useSearchParams';
import {
    Filters,
    useFilteredTrips,
} from '@/hooks/SearchPage/useFilterSearchOption';

export type ThemeAction =
    | { type: 'SET_TRIP_THEMES'; payload: string[] }
    | { type: 'SET_BUDDY_THEMES'; payload: string[] }
    | { type: 'RESET_THEMES' };

type ThemeState = {
    selectedTripThemes: string[];
    selectedBuddyThemes: string[];
};

// 빈 배열로 초기화
const initialState: ThemeState = {
    selectedTripThemes: [],
    selectedBuddyThemes: [],
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
    switch (action.type) {
        case 'SET_TRIP_THEMES':
            // selectedThemes 업데이트
            return { ...state, selectedTripThemes: action.payload };
        case 'SET_BUDDY_THEMES':
            // selectedThemes 업데이트
            return { ...state, selectedBuddyThemes: action.payload };
        case 'RESET_THEMES':
            return initialState;
        default:
            throw new Error('action type?: ${action.type}');
    }
}
export default function SearchPageContainer() {
    const { params, updateQueryParams } = useUrlParams();

    const { searchInput, setSearchInput } = useSearchInput(params);

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

    const [state, dispatch] = useReducer<
        React.Reducer<ThemeState, ThemeAction>
    >(themeReducer, initialState);

    const resetThemes = () => {
        dispatch({ type: 'RESET_THEMES' });
    };

    const setSelectedThemes = (
        value: string[],
        type: 'SET_TRIP_THEMES' | 'SET_BUDDY_THEMES' | 'RESET_THEMES',
    ) => {
        dispatch({
            type,
            payload: value,
        });
    };

    const [showResult, setShowResult] = useState(false);
    const [visibleFirstItems, setVisibleFirstItems] = useState(8);
    const [visibleSecondItems, setVisibleSecondItems] = useState(6);
    const resultRef = useRef<HTMLDivElement>(null);
    const [isXL, setIsXL] = useState<boolean>(false);

    const [PreferTripTheme, selectedTripPreferTheme] = usePreferTheme({
        mode: 'trip',
    });
    const [PreferBuddyTheme, selectedBuddyPreferTheme] = usePreferTheme({
        mode: 'buddy',
    });

    const [filters, setFilters] = useState<Filters>({
        searchInput,
        startDateTimestamp,
        endDateTimestamp,
        thirdLevelLocation,
        selectedGender,
        startAge,
        endAge,
        selectedMeetingPlace,
        selectedThemes: state.selectedTripThemes,
        selectedBuddyThemes: state.selectedBuddyThemes,
    });

    const { resultItems: filteredItems, allItems: filteredAllItems } =
        useFilteredTrips(filters);

    useEffect(() => {
        console.log('filters change: ', filters);
    }, [filters]);

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
    }, []);

    // const resetFilters = useCallback(() => {
    //     setSearchInput('');
    //     setStartDateTimestamp('');
    //     setEndDateTimestamp('');
    //     handleThirdLevelClick('');
    //     setSelectedGender(null);
    //     setStartAge(20);
    //     setEndAge(70);
    //     setSelectedMeetingPlace(null);
    //     setSelectedTripThemes([]);
    //     setSelectedBuddyThemes([]);

    //     // 쿼리 파라미터 업데이트
    //     updateQueryParams({
    //         searchInput: '',
    //         gender: null,
    //         startAge: 20,
    //         endAge: 70,
    //         meetingPlace: null,
    //         location: null,
    //         startDate: '',
    //         endDate: '',
    //         themes: [],
    //         buddyThemes: [],
    //     });
    // }, [
    //     setSearchInput,
    //     setStartDateTimestamp,
    //     setEndDateTimestamp,
    //     handleThirdLevelClick,
    //     setSelectedGender,
    //     setStartAge,
    //     setEndAge,
    //     setSelectedMeetingPlace,
    //     setSelectedTripThemes,
    //     setSelectedBuddyThemes,
    //     updateQueryParams,
    // ]);

    useEffect(() => {
        setSelectedThemes(selectedTripPreferTheme, 'SET_TRIP_THEMES');
    }, [selectedTripPreferTheme]);

    useEffect(() => {
        setSelectedThemes(selectedBuddyPreferTheme, 'SET_BUDDY_THEMES');
    }, [selectedBuddyPreferTheme]);

    const handleShowResult = useCallback(async () => {
        setFilters({
            searchInput,
            startDateTimestamp,
            endDateTimestamp,
            thirdLevelLocation,
            selectedGender,
            startAge,
            endAge,
            selectedMeetingPlace,
            selectedThemes: state.selectedTripThemes,
            selectedBuddyThemes: state.selectedBuddyThemes,
        });

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
    }, [
        searchInput,
        startDateTimestamp,
        endDateTimestamp,
        thirdLevelLocation,
        selectedGender,
        startAge,
        endAge,
        selectedMeetingPlace,
        state.selectedTripThemes,
        state.selectedBuddyThemes,
    ]);

    // enter 누르면 검색 결과 보여주기
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                handleShowResult();
            }
        },
        [handleShowResult],
    );

    const loadMoreFirstItems = () => {
        setVisibleFirstItems(prev => prev + 8);
    };

    const loadMoreSecondItems = () => {
        setVisibleSecondItems(prev => prev + 6);
    };

    const visibleItems = () => {
        if (showResult) {
            if (isXL) {
                return filteredItems.slice(0, visibleFirstItems);
            } else {
                return filteredItems;
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
                <PreferTripTheme className="some-class" />
            </div>
            <div className="my-10">
                <SearchPageTitle
                    title="버디즈 성향"
                    description="3가지를 선택해주세요."
                />
                <PreferBuddyTheme className="some-class" />
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
                        items={visibleItems()}
                        allTrips={filteredAllItems}
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
