import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { followingId, followerId } = await req.json();

    if (!followingId) {
        return new Response('버디 id가 조회되지 않았습니다.', { status: 400 });
    }

    if (!followerId) {
        return new Response('팔로워 id가 조회되지 않았습니다.', {
            status: 400,
        });
    }

    const supabase = createClient();

    try {
        const { data: follow, error } = await supabase.from('follow').insert({
            follow_following_id: followingId,
            follow_follower_id: followerId, // followerId 사용
        });

        if (error) {
            return NextResponse.json(
                { follow: null, error: error.message },
                { status: 500 },
            );
        }

        return NextResponse.json({ follow }, { status: 200 });
    } catch (error) {
        return new Response('팔로잉이 이루어지지 않았습니다.', {
            status: 500,
        });
    }
}
