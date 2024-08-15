import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const followingId = searchParams.get('followingId');
    const followerId = searchParams.get('followerId');

    if (!followingId || !followerId) {
        return NextResponse.json(
            { message: '팔로잉 또는 팔로워 id가 조회되지 않았습니다.' },
            {
                status: 400,
            },
        );
    }

    const supabase = createClient();

    try {
        const { data: originFollow, error } = await supabase
            .from('follow')
            .select('*')
            .eq('follow_following_id', followingId)
            .eq('follow_follower_id', followerId);

        if (error) {
            return NextResponse.json(
                { message: '팔로잉 중복 여부 검사가 되지 않았습니다.' },
                {
                    status: 500,
                },
            );
        }

        // 명시적으로 빈 배열 반환
        if (!originFollow || originFollow.length === 0) {
            return NextResponse.json({ originFollow: [] }, { status: 200 });
        }

        return NextResponse.json({ originFollow }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: '팔로잉 중복 여부 검사가 되지 않았습니다.' },
            {
                status: 500,
            },
        );
    }
}

export async function POST(req: NextRequest) {
    const { followingId, followerId } = await req.json();

    if (!followingId || !followerId) {
        return NextResponse.json(
            { message: '팔로잉 또는 팔로워 id가 조회되지 않았습니다.' },
            {
                status: 400,
            },
        );
    }

    const supabase = createClient();

    try {
        const { data: follow, error } = await supabase.from('follow').insert({
            follow_following_id: followingId,
            follow_follower_id: followerId,
        });

        if (error) {
            return NextResponse.json(
                { follow: null, error: error.message || '알 수 없는 오류' },
                { status: 500 },
            );
        }

        return NextResponse.json({ follow }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: '팔로잉이 이루어지지 않았습니다.' },
            {
                status: 500,
            },
        );
    }
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const followingId = searchParams.get('followingId');
    const followerId = searchParams.get('followerId');

    if (!followingId || !followerId) {
        return NextResponse.json(
            { message: '팔로잉 또는 팔로워 id가 조회되지 않았습니다.' },
            {
                status: 400,
            },
        );
    }

    const supabase = createClient();

    try {
        const { data: follow, error } = await supabase
            .from('follow')
            .delete()
            .eq('follow_following_id', followingId)
            .eq('follow_follower_id', followerId);

        if (error) {
            return NextResponse.json(
                { follow: null, error: error.message || '알 수 없는 오류' },
                { status: 500 },
            );
        }

        return NextResponse.json({ follow }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: '팔로잉이 취소되지 않았습니다.' },
            {
                status: 500,
            },
        );
    }
}
