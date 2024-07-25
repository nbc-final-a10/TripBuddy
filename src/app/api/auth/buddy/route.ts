import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

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
