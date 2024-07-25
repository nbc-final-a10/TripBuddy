import { getBuddyServer } from '@/api-services/auth/getBuddyServer';
import AuthPageBottom from '@/components/molecules/auth/AuthPageBottom';
import AuthPageWrapper from '@/components/molecules/auth/AuthPageWrapper';
import ResetForm from '@/components/organisms/auth/PasswordResetForm';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy } from '@/types/Auth.types';
import { QueryClient } from '@tanstack/react-query';
import Link from 'next/link';

export default async function RecoverPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEY_BUDDY],
        queryFn: () => getBuddyServer(),
    });
    const buddy = queryClient.getQueryData<Buddy | undefined>([
        QUERY_KEY_BUDDY,
    ]);

    return (
        <AuthPageWrapper>
            {!buddy ? (
                <p className="text-sm min-h-[35%]text-gray-500">
                    이메일 링크를 통한 접근만 가능합니다! 다시 시도해주세요
                </p>
            ) : (
                <ResetForm />
            )}

            <AuthPageBottom />

            <p className="text-sm text-gray-500">
                Create account?{' '}
                <Link href="/signup" className="text-turtleGreen">
                    Sign up
                </Link>
            </p>
        </AuthPageWrapper>
    );
}
