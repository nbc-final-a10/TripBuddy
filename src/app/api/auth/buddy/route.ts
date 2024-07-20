import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    // let hasCookie = false;
    // const cookieStore = cookies();
    // const cookiesArray = cookieStore.getAll();

    // console.log("cookiesArray ====>", cookiesArray);

    // if (cookiesArray.length === 0) {
    //     hasCookie = false;
    // } else {
    //     const authToken = cookiesArray.map((cookie) => {
    //         if (cookie.name.startsWith("sb-ngtnbcqokvtyrilhkwpz-auth-token")) {
    //             return true;
    //         }
    //         return false;
    //     });
    //     hasCookie = authToken.every((cookie) => cookie);
    // }

    // // console.log("authToken ====>", hasCookie);

    // if (!hasCookie) {
    //     return NextResponse.json({ data: { user: "cookie not found" } }, { status: 200 });
    // }
    //sb-ngtnbcqokvtyrilhkwpz-auth-token.0

    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        if (error.message === 'Auth session missing!')
            return NextResponse.json(
                { data: { user: 'Auth session missing!' } },
                { status: 200 },
            );

        if (error.message === 'Unauthorized')
            return NextResponse.json(
                { data: { user: 'Unauthorized' } },
                { status: 401 },
            );
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }
    if (!user) {
        return NextResponse.json(
            { data: { user: 'User not found' } },
            { status: 404 },
        );
    }

    const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    if (userError) {
        console.error(userError);
        return NextResponse.json(
            { error: userError?.message },
            { status: 401 },
        );
    }

    const response = {
        ...user,
        userTableInfo: userData,
    };

    return NextResponse.json({ data: { user: response } }, { status: 200 });
}
