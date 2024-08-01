import { StoryData } from '@/types/Story.type';
import convertToWebP from '@/utils/common/convertToWebp';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { imageBuffered, texts }: StoryData = await req.json();
    const supabase = createClient();

    const filePath = `stories_${Date.now()}.webp`;

    const imageBuffer = await convertToWebP(imageBuffered, 1080);

    if (!imageBuffer) {
        return NextResponse.json(
            { error: 'Image conversion failed' },
            { status: 401 },
        );
    }

    const { data, error } = await supabase.storage
        .from('stories')
        .upload(filePath, imageBuffer, { contentType: 'image/webp' });

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
