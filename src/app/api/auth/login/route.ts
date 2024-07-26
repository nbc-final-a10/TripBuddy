import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // console.log(error);
        return NextResponse.json(
            { buddy: null, error: error.message },
            { status: 400 },
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
