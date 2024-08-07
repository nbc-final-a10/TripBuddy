'use client';

import { useAuth } from '@/hooks/auth';
import { getUserIdFromHeader } from '@/utils/auth/getUserIdFromHeader';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const followingId = searchParams.get('followingId');
    const { buddy } = useAuth();

    if (!followingId) {
        return new Response('버디 id가 조회되지 않았습니다.', { status: 400 });
    }

    const supabase = createClient();

    try {
        // 헤더에서 사용자 ID를 가져옴
        const userId = getUserIdFromHeader(req);
        if (!userId) {
            return NextResponse.json(
                {
                    follow: null,
                    error: '팔로잉 대상 버디의 정보가 확인되지 않았습니다.',
                },
                { status: 401 },
            );
        }

        if (!buddy) {
            return NextResponse.json(
                {
                    follow: null,
                    error: '팔로워 버디의 정보가 확인되지 않았습니다.',
                },
                { status: 401 },
            );
        }

        const { data: follow, error } = await supabase.from('follow').insert({
            follow_following_id: followingId,
            follow_follower_id: buddy?.buddy_id,
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
