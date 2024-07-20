import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const name = data.name as string;
    const email = data.email as string;
    const password = data.password as string;

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { user_name: name } },
    });

    if (error) {
        return NextResponse.json(
            { user: null, error: error?.message },
            { status: 401 },
        );
    }

    return NextResponse.json({ user }, { status: 200 });
}
