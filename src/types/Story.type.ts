import { Tables } from './supabase';

export type Story = Tables<'stories'>;

export type PartialStory = Partial<Story>;

export type StoryData = {
    imageBuffered: string;
    texts: { text: string; position: { x: number; y: number } }[];
};
