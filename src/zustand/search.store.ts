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
    getGenderFilteredItems: () => Trip[];

    selectedMeetingPlace: string | null;
    setSelectedMeetingPlace: (place: string | null) => void;
    getSelectedMeetingPlace: () => Trip[];

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

    getGenderFilteredItems: () => {
        const state = get();
        return state.selectedGender
            ? state.items.filter(
                  (item: Trip) => item.trip_wanted_sex === state.selectedGender,
              )
            : state.items;
    },

    selectedMeetingPlace: null,
    setSelectedMeetingPlace: (place: string | null) =>
        set({ selectedMeetingPlace: place }),

    getSelectedMeetingPlace: () => {
        const state = get();
        return state.selectedMeetingPlace
            ? state.items.filter(
                  (item: Trip) =>
                      item.trip_meet_location === state.selectedMeetingPlace,
              )
            : state.items;
    },

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

        return filteredItems;
    },
}));
