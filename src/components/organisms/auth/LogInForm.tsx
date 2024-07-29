'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { SubmitButton } from '../../atoms/common/O_Submit-button';
import { authValidation } from '@/utils/validation';
import Input from '@/components/atoms/common/O_Input';
import { useAuth } from '@/hooks/auth';

function LogInForm() {
    const { isPending, logIn, sendingResetEmail } = useAuth();
    const searchParams = useSearchParams();
    const search = searchParams.get('mode');
    const [isRecoverPassword, setIsRecoverPassword] = useState(
        search === 'recover',
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const isValid = authValidation(email, password);

        if (!isValid) return;

        form.reset();

        logIn(email, password);
    };

    const handleRecoverPassword = (e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get('email') as string;

        const isValid = authValidation(email);

        if (!isValid) return;

        form.reset();

        sendingResetEmail(email);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 pb-6">
                <h1 className="text-2xl font-Pretendard-Regular font-bold">
                    {isRecoverPassword ? '비밀번호 복구' : '로그인'}
                </h1>
                <p className="text-sm font-Pretendard-Regular text-gray-500">
                    {isRecoverPassword
                        ? 'Recover your password'
                        : 'Sign up to continue using our App'}
                </p>
            </div>

            <form
                onSubmit={
                    isRecoverPassword ? handleRecoverPassword : handleSubmit
                }
                className="w-full h-fit min-h-[35%] flex flex-col items-center justify-center gap-10"
            >
                <div className="w-[90%] flex flex-col items-center justify-center font-Pretendard-Regular gap-10">
                    <Input type="text" placeholder="email" name="email" />

                    {isRecoverPassword ? null : (
                        <div
                            className={clsx(
                                'w-full flex flex-col gap-1',
                                isRecoverPassword && 'gap-4',
                            )}
                        >
                            <Input
                                type="password"
                                placeholder="password"
                                name="password"
                            />

                            {isRecoverPassword && (
                                <Input
                                    type="password"
                                    placeholder="confirm password"
                                    name="passwordConfirm"
                                />
                            )}

                            <button
                                type="button"
                                onClick={() => setIsRecoverPassword(true)}
                                className="w-full text-sm text-right text-gray-500"
                            >
                                Forget Password?
                            </button>
                        </div>
                    )}

                    {isRecoverPassword && (
                        <p className="w-full text-sm text-right text-gray-500">
                            이메일로 복구 코드를 보내드립니다
                        </p>
                    )}
                </div>

                <SubmitButton
                    className="bg-sky-200 w-[70%] text-white rounded-lg px-4 py-2"
                    type="submit"
                    pendingText="로딩..."
                    pending={isPending}
                >
                    {isRecoverPassword ? '복구메일보내기' : '로그인하기'}
                </SubmitButton>
            </form>
        </>
    );
}
export default LogInForm;
