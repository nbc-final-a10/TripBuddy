import { buddyThemes, tripThemes } from '@/data/themes';

export type TripTheme = (typeof tripThemes)[number]['ko'];
export type TripThemeEn = (typeof tripThemes)[number]['en'];

export type BuddyTheme = (typeof buddyThemes)[number]['ko'];
export type BuddyThemeEn = (typeof buddyThemes)[number]['en'];
