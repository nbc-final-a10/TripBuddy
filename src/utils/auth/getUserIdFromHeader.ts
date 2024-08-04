import { NextRequest } from 'next/server';

export function getUserIdFromHeader(req: NextRequest): string | null {
    const userId = req.headers.get('user');
    if (!userId) {
        return null;
    }
    return userId;
}
