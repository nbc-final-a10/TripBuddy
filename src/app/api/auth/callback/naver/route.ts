import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { accessToken } = await request.json();

    if (!accessToken) {
        return NextResponse.json(
            { error: 'Access token not found' },
            { status: 400 },
        );
    }

    try {
        // 네이버 API를 사용하여 사용자 정보 가져오기
        const response = await fetch('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch user info from Naver' },
                { status: 400 },
            );
        }

        const userData = await response.json();

        return NextResponse.json({ user: userData.response });
    } catch (error) {
        console.error('Error during Naver login callback:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}
