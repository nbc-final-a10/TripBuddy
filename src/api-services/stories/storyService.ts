import { Story, StoryData } from '@/types/Story.type';
import fetchWrapper from '@/utils/api/fetchWrapper';

export async function postStory(payload: StoryData): Promise<Story> {
    const url = `/api/stories`;
    try {
        const data = await fetchWrapper<Story>(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        return data;
    } catch (error: any) {
        throw error;
    }
}
