'use server';

import { cookies } from 'next/headers';

export async function setCookieAction() {
    const cookieStore = cookies();
    cookieStore.set({
        name: 'hasVisitedTutorial',
        value: 'true',
        path: '/',
        sameSite: 'lax',
    });

    return true;
}
