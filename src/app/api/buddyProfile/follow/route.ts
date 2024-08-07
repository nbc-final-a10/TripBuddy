import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const followingId = searchParams.get('followingId');
    const followerId = searchParams.get('followerId');

    if (!followingId || !followerId) {
        return new Response('팔로잉 또는 팔로워 id가 조회되지 않았습니다.', {
            status: 400,
        });
    }

    const supabase = createClient();

    try {
        const { data: originFollow, error } = await supabase
            .from('follow')
            .select('*')
            .eq('follow_following_id', followingId)
            .eq('follow_follower_id', followerId);

        if (error) {
            return new Response('팔로잉 중복 여부 검사가 되지 않았습니다.', {
                status: 500,
            });
        }

        if (originFollow.length > 0) {
            return NextResponse.json({ originFollow }, { status: 200 });
        } else {
            return NextResponse.json({ originFollow: null }, { status: 404 });
        }
    } catch (error) {
        return new Response('팔로잉 중복 여부 검사가 되지 않았습니다.', {
            status: 500,
        });
    }
}

export async function POST(req: NextRequest) {
    const { followingId, followerId } = await req.json();

    if (!followingId || !followerId) {
        return new Response('팔로잉 또는 팔로워 id가 조회되지 않았습니다.', {
            status: 400,
        });
    }

    const supabase = createClient();

    try {
        const { data: follow, error } = await supabase.from('follow').insert({
            follow_following_id: followingId,
            follow_follower_id: followerId,
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
