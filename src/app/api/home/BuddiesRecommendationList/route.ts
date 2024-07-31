import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const supabase = createClient();

        // buddies 테이블에서 buddy_temperature가 가장 높은 10명 가져오기
        const { data: buddies, error } = await supabase
            .from('buddies')
            .select('*')
            .order('buddy_temperature', { ascending: false })
            .limit(10);

        // 데이터베이스 에러 처리
        if (error) {
            console.error('버디 추천 리스트 통신 오류 발생:', error);
            return NextResponse.json(
                { buddies: null, error: error?.message },
                { status: 500 },
            );
        }

        // 성공 시 응답
        return NextResponse.json({ buddies }, { status: 200 });
    } catch (error) {
        // 일반 에러 처리
        console.error('버디 추천 리스트 통신 오류 발생:', error);
        return NextResponse.json(
            { buddies: null, error: '서버 오류' },
            { status: 500 },
        );
    }
}
