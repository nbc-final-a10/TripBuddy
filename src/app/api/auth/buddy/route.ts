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
                { data: { buddy: 'Auth session missing!' } },
                { status: 401 },
            );

        if (error.message === 'Unauthorized')
            return NextResponse.json(
                { data: { buddy: 'Unauthorized' } },
                { status: 401 },
            );
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }
    if (!user) {
        return NextResponse.json(
            { data: { buddy: 'User not found' } },
            { status: 404 },
        );
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

export const POST = async (req: NextRequest) => {
    const { buddyInfo } = await req.json();
    const supabase = createClient();

    console.log('authBuddyInfo ===>', buddyInfo);

    const { data, error } = await supabase
        .from('buddies')
        .insert([buddyInfo])
        .select();

    if (error) {
        console.error(error);
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }

    return NextResponse.json({ buddy: data }, { status: 200 });
};
