import { Story, StoryData, StoryWithBuddies } from '@/types/Story.types';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function postStory(payload: StoryData): Promise<Story> {
    const url = `/api/stories`;
    try {
        const data = await fetchWrapper<Story>(url, {
            method: 'POST',
            body: payload,
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function getStories(): Promise<StoryWithBuddies[]> {
    const url = `/api/stories`;
    try {
        const data = await fetchWrapper<StoryWithBuddies[]>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function getStory(id: string): Promise<StoryWithBuddies> {
    const url = `/api/stories/${id}`;
    try {
        const data = await fetchWrapper<StoryWithBuddies>(url, {
            method: 'GET',
            cache: 'no-store',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
