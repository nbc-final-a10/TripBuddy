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
    // GenderFilteredItems: () => Trip[];
};

export const useSearchStore = create<SearchStore>(set => ({
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

    // GenderFilteredItems: () => {
    //     const state = get();
    //     return state.selectedGender
    //         ? state.items.filter(
    //               (item: Trip) => item.trip_wanted_sex === state.selectedGender,
    //           )
    //         : state.items;
    // },
}));
