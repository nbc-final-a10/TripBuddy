import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 서버에서 요청할 때
export async function POST(req: NextRequest) {
    const { imageFile, texts } = await req.json();
    const supabase = createClient();

    const filePath = `stories_${Date.now()}.png`;

    console.log(imageFile);

    const { data, error } = await supabase.storage
        .from('stories')
        .upload(filePath, imageFile);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }

    const { data: publicUrlData } = await supabase.storage
        .from('stories')
        .getPublicUrl(filePath);

    const jsonb = JSON.stringify(texts);

    const payload = {
        story_media: publicUrlData.publicUrl,
        story_overlay: jsonb,
    };

    const { data: story, error: storyError } = await supabase
        .from('stories')
        .insert({ ...payload })
        .select();

    if (storyError) {
        console.error(storyError);
        return NextResponse.json(
            { error: storyError?.message },
            { status: 401 },
        );
    }

    return NextResponse.json(story, { status: 200 });
}
