import { Buddy } from './Auth.types';
import { Tables } from './supabase';

export type Story = Tables<'stories'>;

export type StoryWithBuddies = Story & {
    buddies: Buddy;
};

export type PartialStory = Partial<Story>;

export type StoryData = FormData;

export type StoryOverlay = {
    text: string;
    textColor: string;
    position: {
        x: number;
        y: number;
    };
    filter?: StoryFilter;
};

export type StoryFilter = {
    name: string;
    className: string;
};
