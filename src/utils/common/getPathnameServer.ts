import { headers } from 'next/headers';

export const getPathnameServer = () => {
    const headersList = headers();
    return headersList.get('x-pathname');
};
