import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    let isPending = true;

    const supabase = createClient();

    try {
        const { data: buddies, error } = await supabase
            .from('buddies')
            .select('*')
            .eq('buddy_id', id);

        if (error) {
            console.error('버디 통신 오류 발생:', error);
            isPending = false;
            return NextResponse.json(
                { buddies: null, error: error?.message, isPending },
                { status: 500 },
            );
        }

        isPending = false;
        return NextResponse.json({ buddies, isPending }, { status: 200 });
    } catch (error) {
        console.error('버디 통신 오류 발생:', error);
        isPending = false;
        return NextResponse.json(
            { buddies: null, error: '서버 오류', isPending },
            { status: 500 },
        );
    }
}
