import AuthPageBottom from '@/components/molecules/auth/AuthPageBottom';
import AuthPageWrapper from '@/components/molecules/auth/AuthPageWrapper';
import SignUpForm from '@/components/organisms/auth/SignUpForm';
import Link from 'next/link';

function SignUpPage() {
    return (
        <AuthPageWrapper>
            <SignUpForm />

            <AuthPageBottom />

            <p className="text-sm text-gray-500">
                <span>Already have an account?</span>
                <Link href="/login" className="text-blue-500">
                    Log In
                </Link>
            </p>
        </AuthPageWrapper>
    );
}

export default SignUpPage;
