import { PartialBuddy } from '@/types/Auth.types';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        if (error.message === 'Auth session missing!')
            return NextResponse.json(
                { buddy: null, error: 'Auth session missing!' },
                { status: 200 },
            );

        if (error.message === 'Unauthorized')
            return NextResponse.json(
                { buddy: null, error: 'Unauthorized' },
                { status: 401 },
            );
        return NextResponse.json(
            { buddy: null, error: error?.message },
            { status: 401 },
        );
    }
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { data: buddy, error: userError } = await supabase
        .from('buddies')
        .select('*')
        .eq('buddy_id', user.id)
        .single();

    if (userError) {
        console.error(userError);
        return NextResponse.json(
            { error: userError?.message },
            { status: 401 },
        );
    }

    return NextResponse.json({ buddy: buddy }, { status: 200 });
}

export const PATCH = async (req: NextRequest) => {
    const { buddyInfo }: { buddyInfo: PartialBuddy } = await req.json();
    const supabase = createClient();

    // console.log('authBuddyInfo ===>', buddyInfo);

    const { data, error } = await supabase
        .from('buddies')
        .update([{ ...buddyInfo }])
        .eq('buddy_id', buddyInfo.buddy_id)
        .select();

    if (error) {
        if (error.message.includes('duplicate')) {
            return NextResponse.json(
                { error: '이미 존재하는 닉네임입니다.' },
                { status: 401 },
            );
        }

        return NextResponse.json({ error: error?.message }, { status: 401 });
    }

    return NextResponse.json({ buddy: data }, { status: 200 });
};
