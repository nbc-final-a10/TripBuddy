import { Tables } from '@/types/supabase';
import { create } from 'zustand';

type Trip = Tables<'trips'>;

type SearchStore = {
    items: Trip[];
    visibleFirstItems: number;
    visibleSecondItems: number;
    loadMoreFirstItems: () => void;
    loadMoreSecondItems: () => void;
    setItems: (items: Trip[]) => void;

    selectedGender: string | null;
    setSelectedGender: (gender: string | null) => void;

    selectedMeetingPlace: string | null;
    setSelectedMeetingPlace: (place: string | null) => void;

    startAge: number;
    endAge: number;
    setStartAge: (age: number) => void;
    setEndAge: (age: number) => void;

    buddyCount: number | null;
    setBuddyCount: (count: number | null) => void;

    thirdLevelLocation: string | null;
    setThirdLevelLocation: (location: string | null) => void;

    selectedThemes: string[];
    setSelectedThemes: (themes: string[]) => void;

    selectedBuddyThemes: string[];
    setSelectedBuddyThemes: (themes: string[]) => void;

    getFilteredItems: () => Trip[];
};

export const useSearchStore = create<SearchStore>((set, get) => ({
    items: [],
    visibleFirstItems: 8,
    visibleSecondItems: 6,
    loadMoreFirstItems: () =>
        set(state => ({
            visibleFirstItems: state.visibleFirstItems + 8,
        })),
    loadMoreSecondItems: () =>
        set(state => ({
            visibleSecondItems: state.visibleSecondItems + 6,
        })),
    setItems: (items: Trip[]) => set({ items }),

    selectedGender: null,
    setSelectedGender: (gender: string | null) =>
        set({ selectedGender: gender }),

    selectedMeetingPlace: null,
    setSelectedMeetingPlace: (place: string | null) =>
        set({ selectedMeetingPlace: place }),

    startAge: 18,
    endAge: 150,
    setStartAge: (age: number) => set({ startAge: age }),
    setEndAge: (age: number) => set({ endAge: age }),

    buddyCount: null,
    setBuddyCount: (count: number | null) => set({ buddyCount: count }),

    thirdLevelLocation: null,
    setThirdLevelLocation: (location: string | null) =>
        set({ thirdLevelLocation: location }),

    selectedThemes: [],
    setSelectedThemes: (themes: string[]) => set({ selectedThemes: themes }),

    selectedBuddyThemes: [],
    setSelectedBuddyThemes: (themes: string[]) =>
        set({ selectedBuddyThemes: themes }),

    getFilteredItems: () => {
        const state = get();
        let filteredItems = state.items;

        if (state.selectedGender) {
            filteredItems = filteredItems.filter(
                (item: Trip) => item.trip_wanted_sex === state.selectedGender,
            );
        }

        if (state.selectedMeetingPlace) {
            filteredItems = filteredItems.filter(
                (item: Trip) =>
                    item.trip_meet_location === state.selectedMeetingPlace,
            );
        }

        if (state.startAge !== undefined && state.endAge !== undefined) {
            filteredItems = filteredItems.filter(
                (item: Trip) =>
                    item.trip_start_age >= state.startAge &&
                    item.trip_end_age <= state.endAge,
            );
        }

        if (state.buddyCount !== null) {
            filteredItems = filteredItems.filter(
                (item: Trip) =>
                    item.trip_max_buddies_counts === state.buddyCount,
            );
        }

        if (state.thirdLevelLocation !== null) {
            filteredItems = filteredItems.filter((item: Trip) =>
                item.trip_final_destination.includes(
                    state.thirdLevelLocation as string,
                ),
            );
        }

        if (state.selectedThemes.length > 0) {
            filteredItems = filteredItems.filter((item: Trip) =>
                state.selectedThemes.every(theme =>
                    [
                        item.trip_theme1,
                        item.trip_theme2,
                        item.trip_theme3,
                    ].includes(theme),
                ),
            );
        }

        if (state.selectedBuddyThemes.length > 0) {
            filteredItems = filteredItems.filter((item: Trip) =>
                state.selectedBuddyThemes.every(theme =>
                    [
                        item.trip_wanted_buddies1,
                        item.trip_wanted_buddies2,
                        item.trip_wanted_buddies3,
                    ].includes(theme),
                ),
            );
        }

        return filteredItems;
    },
}));
