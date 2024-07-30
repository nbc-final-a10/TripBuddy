import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const supabase = createClient();
        const tripData = await req.json();

        const { data: trip, error } = await supabase
            .from('trips')
            .insert(tripData)
            .select();

        // 데이터베이스 에러 처리
        if (error) {
            console.error('게시글 업데이트 중 오류 발생:', error);
            return NextResponse.json(
                { trip: null, error: error?.message },
                { status: 500 },
            );
        }

        // 성공 시 응답
        return NextResponse.json({ trip }, { status: 200 });
    } catch (error) {
        // 일반 에러 처리
        console.error('게시글 업데이트 중 오류 발생:', error);
        return NextResponse.json(
            { trip: null, error: '서버 오류' },
            { status: 500 },
        );
    }
}
