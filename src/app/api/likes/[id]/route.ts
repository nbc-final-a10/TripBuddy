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
