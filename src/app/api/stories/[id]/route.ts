import { StoryWithBuddies } from '@/types/Story.type';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { id: string } }) {
    const { id } = params;

    const supabase = createClient();

    const {
        data: story,
        error: storyError,
    }: {
        data: StoryWithBuddies | null;
        error: PostgrestError | null;
    } = await supabase
        .from('stories')
        .select('*, buddies:story_created_by (*)')
        .eq('id', id)
        .maybeSingle();

    if (storyError) {
        console.error(storyError);
        return NextResponse.json(
            { error: storyError?.message },
            { status: 401 },
        );
    }

    if (!story) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json(story, { status: 200 });
}
