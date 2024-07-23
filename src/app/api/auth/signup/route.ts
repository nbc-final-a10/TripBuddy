import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const data = await request.json();
    const email = data.email as string;
    const password = data.password as string;

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.signUp({
        email,
        password,
        // 닉네임은 자동설정이고, 온보딩시에 설정하므로 아래 옵션은 삭제
        // options: { data: { user_name: name } },
    });

    if (error) {
        return NextResponse.json(
            { user: null, error: error?.message },
            { status: 401 },
        );
    }

    return NextResponse.json({ user }, { status: 200 });
}
