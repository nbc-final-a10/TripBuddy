import { Tables } from '@/types/supabase';

type Trip = Tables<'trips'>;

export const filterAndSortTrips = (
    trips: Trip[],
    selectedThemes: string[],
): Trip[] => {
    return trips
        .map(trip => {
            // 선택된 테마와 일치하는 테마의 갯수
            const tripThemes = [
                trip.trip_theme1,
                trip.trip_theme2,
                trip.trip_theme3,
            ];
            const matchingCount = selectedThemes.filter(theme =>
                tripThemes.includes(theme),
            ).length;
            return { trip, matchingCount };
        })
        .sort((a, b) => b.matchingCount - a.matchingCount)
        .map(({ trip }) => trip);
};
// 일치하는 수 순서대로 정렬
// trip 객체만 반환

export const filterAndSortTripsBuddies = (
    trips: Trip[],
    selectedBuddyThemes: string[],
): Trip[] => {
    return trips
        .map(trip => {
            const buddyThemes = [
                trip.trip_wanted_buddies1,
                trip.trip_wanted_buddies2,
                trip.trip_wanted_buddies3,
            ];
            const matchingCount = buddyThemes.filter(theme =>
                buddyThemes.includes(theme),
            ).length;
            return { trip, matchingCount };
        })
        .sort((a, b) => b.matchingCount - a.matchingCount)
        .map(({ trip }) => trip);
};
