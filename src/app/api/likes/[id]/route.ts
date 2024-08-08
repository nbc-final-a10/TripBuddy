import { StoryLikes } from '@/types/Story.types';
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
        data: likes,
        error: likesError,
    }: {
        data: StoryLikes[] | null;
        error: PostgrestError | null;
    } = await supabase
        .from('storylikes')
        .select('*')
        .eq('storylikes_story_id', id);

    if (likesError) {
        console.error(likesError);
        return NextResponse.json(
            { error: likesError?.message },
            { status: 401 },
        );
    }

    if (!likes) {
        return NextResponse.json({ error: 'Likes not found' }, { status: 404 });
    }

    return NextResponse.json(likes, { status: 200 });
}

export async function POST(request: NextRequest) {
    const { story_id, isLiked, buddy_id } = await request.json();

    if (!story_id) {
        return NextResponse.json(
            { error: 'story_id is required' },
            { status: 400 },
        );
    }

    const supabase = createClient();

    if (isLiked) {
        const {
            data,
            error,
        }: { data: StoryLikes | null; error: PostgrestError | null } =
            await supabase
                .from('storylikes')
                .insert([
                    {
                        storylikes_story_id: story_id,
                        storylikes_buddy_id: buddy_id,
                    },
                ])
                .select()
                .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        const {
            data: likes,
            error: likesError,
        }: {
            data: StoryLikes[] | null;
            error: PostgrestError | null;
        } = await supabase
            .from('storylikes')
            .select('*')
            .eq('storylikes_story_id', story_id);

        if (likesError) {
            console.error(likesError);
            return NextResponse.json(
                { error: likesError?.message },
                { status: 401 },
            );
        }

        return NextResponse.json(likes, { status: 200 });
    } else {
        const {
            data,
            error,
        }: { data: StoryLikes | null; error: PostgrestError | null } =
            await supabase
                .from('storylikes')
                .delete()
                .eq('storylikes_story_id', story_id)
                .eq('storylikes_buddy_id', buddy_id)
                .select()
                .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        const {
            data: likes,
            error: likesError,
        }: {
            data: StoryLikes[] | null;
            error: PostgrestError | null;
        } = await supabase
            .from('storylikes')
            .select('*')
            .eq('storylikes_story_id', story_id);

        if (likesError) {
            console.error(likesError);
            return NextResponse.json(
                { error: likesError?.message },
                { status: 401 },
            );
        }
        return NextResponse.json(likes, { status: 200 });
    }
}
