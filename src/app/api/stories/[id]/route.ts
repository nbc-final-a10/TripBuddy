import { StoryWithBuddies } from '@/types/Story.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;

    const supabase = createClient();

    const {
        data: story,
        error: storyError,
    }: {
        data: StoryWithBuddies[] | null;
        error: PostgrestError | null;
    } = await supabase
        .from('stories')
        .select('*, buddies:story_created_by (*)')
        .eq('story_created_by', id)
        .order('story_created_at', { ascending: false });

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

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    const { id } = params;

    const supabase = createClient();

    const {
        error: storyError,
    }: {
        error: PostgrestError | null;
    } = await supabase.from('stories').delete().eq('story_id', id);

    if (storyError) {
        console.error(storyError);
        return NextResponse.json(
            { error: storyError?.message },
            { status: 401 },
        );
    }

    return NextResponse.json(
        { message: 'story deleted successfully' },
        { status: 200 },
    );
}
