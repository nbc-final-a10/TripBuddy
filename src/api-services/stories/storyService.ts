import { Story, StoryData, StoryWithBuddies } from '@/types/Story.type';
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

export async function getStory(): Promise<StoryWithBuddies[]> {
    const url = `/api/stories`;
    try {
        const data = await fetchWrapper<StoryWithBuddies[]>(url, {
            method: 'GET',
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
