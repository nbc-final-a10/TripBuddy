import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (code) {
        const cookieStore = cookies();

        cookieStore.set({
            name: 'naver-provider-login-code',
            value: code,
            httpOnly: true,
            path: '/',
        });

        if (!error) return NextResponse.redirect(`${origin}`);
    }

    if (errorDescription) console.log('errorDescription =>', errorDescription);

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
