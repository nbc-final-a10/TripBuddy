import { TripWithContract } from '@/types/Trips.types';
import {
    filterAndSortTrips,
    filterAndSortTripsBuddies,
} from '@/utils/search/filterAndSortTrips';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export function useFilteredTrips(filters: {
    searchInput: string;
    startDateTimestamp: string;
    endDateTimestamp: string;
    thirdLevelLocation: string | null;
    selectedGender: string | null;
    startAge: number;
    endAge: number;
    selectedMeetingPlace: string | null;
    selectedThemes: string[];
    selectedBuddyThemes: string[];
}) {
    const [resultItems, setResultItems] = useState<TripWithContract[]>([]);
    const [allItems, setAllItems] = useState<TripWithContract[]>([]);

    useEffect(() => {
        const fetchFilteredTrips = async () => {
            const { data, error } = await supabase.from('trips').select('*');
            if (error) {
                console.error('Fetch Error:', error.message);
                return;
            }

            let filteredItems = data as TripWithContract[];

            // filters 객체 구조 분해하여 변수 사용
            const {
                searchInput,
                startDateTimestamp,
                endDateTimestamp,
                thirdLevelLocation,
                selectedGender,
                startAge,
                endAge,
                selectedMeetingPlace,
                selectedThemes,
                selectedBuddyThemes,
            } = filters;

            if (searchInput) {
                filteredItems = filteredItems.filter(
                    (item: TripWithContract) =>
                        item.trip_title
                            .toLowerCase()
                            .includes(searchInput.toLowerCase()) ||
                        item.trip_content
                            .toLowerCase()
                            .includes(searchInput.toLowerCase()),
                );
            }

            if (startDateTimestamp && endDateTimestamp) {
                const startDate = new Date(startDateTimestamp);
                const endDate = new Date(endDateTimestamp);

                filteredItems = filteredItems.filter(
                    (item: TripWithContract) => {
                        const tripStartDate = new Date(item.trip_start_date);
                        const TripEndDate = new Date(item.trip_end_date);

                        return (
                            tripStartDate <= endDate && TripEndDate >= startDate
                        );
                    },
                );
            }

            if (thirdLevelLocation !== null) {
                filteredItems = filteredItems.filter((item: TripWithContract) =>
                    item.trip_final_destination.includes(
                        thirdLevelLocation as string,
                    ),
                );
            }

            if (selectedGender) {
                filteredItems = filteredItems.filter(
                    (item: TripWithContract) =>
                        item.trip_wanted_sex === selectedGender,
                );
            }

            if (selectedMeetingPlace) {
                filteredItems = filteredItems.filter(
                    (item: TripWithContract) =>
                        item.trip_meet_location === selectedMeetingPlace,
                );
            }

            if (startAge !== undefined && endAge !== undefined) {
                filteredItems = filteredItems.filter(
                    (item: TripWithContract) =>
                        item.trip_start_age >= startAge &&
                        item.trip_end_age <= endAge,
                );
            }

            if (selectedThemes.length > 0) {
                filteredItems = filterAndSortTrips(
                    filteredItems,
                    selectedThemes,
                );
            }
            if (selectedBuddyThemes.length > 0) {
                filteredItems = filterAndSortTripsBuddies(
                    filteredItems,
                    selectedBuddyThemes,
                );
            }

            setResultItems(filteredItems);
            setAllItems(data as TripWithContract[]);
        };

        fetchFilteredTrips();
    }, [filters]);

    return { resultItems, allItems };
}
