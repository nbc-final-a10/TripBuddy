import { NextRequest } from 'next/server';

export const getPathnameServer = (request: NextRequest) => {
    const requestHeaders = new Headers(request.headers);
    return requestHeaders.get('x-pathname');
};
