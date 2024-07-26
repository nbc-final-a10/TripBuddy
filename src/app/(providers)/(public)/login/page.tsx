import AuthPageBottom from '@/components/molecules/auth/AuthPageBottom';
import AuthPageWrapper from '@/components/molecules/auth/AuthPageWrapper';
import LogInForm from '@/components/organisms/auth/LogInForm';
import Link from 'next/link';
import React from 'react';

const LogInPage: React.FC = () => {
    return (
        <AuthPageWrapper>
            <LogInForm />

            <AuthPageBottom />

            <p className="text-sm text-gray-500">
                <span>Create account?</span>
                <Link href="/signup" className="text-blue-500">
                    Sign up
                </Link>
            </p>
        </AuthPageWrapper>
    );
};

export default LogInPage;
