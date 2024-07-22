'use client';

import { Input } from '@/components/atoms/common/O_Input';
import { SubmitButton } from '@/components/atoms/common/O_Submit-button';
import { useAuth } from '@/hooks/auth.hooks';
import { emailRegex } from '@/utils/regexs';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { validateWhiteSpace } from '@/utils/validation';
import { FormEvent } from 'react';

function SignUpForm() {
    const { isPending, signUp } = useAuth();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const passwordConfirm = formData.get('passwordConfirm') as string;

        form.reset();

        signUp(name, email, password);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 pb-6">
                <h1 className="text-2xl font-bold">회원가입</h1>
                <p className="text-sm text-gray-500">
                    Please enter the details below to continue
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full h-fit min-h-[35%] flex flex-col items-center justify-center gap-10"
            >
                <div className="w-[90%] flex flex-col items-center justify-center gap-10">
                    <div className="w-full flex flex-col gap-4">
                        <Input
                            type="text"
                            placeholder="your email"
                            name="email"
                        />
                        <Input
                            type="text"
                            placeholder="your nickname"
                            name="name"
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            name="password"
                        />
                        <Input
                            type="password"
                            placeholder="repeat password"
                            name="passwordConfirm"
                        />
                    </div>
                </div>

                <SubmitButton
                    className="bg-turtleGreen w-[70%] text-white rounded-lg px-4 py-2 text-foreground"
                    pendingText="회원가입중..."
                    pending={isPending}
                >
                    회원가입
                </SubmitButton>
            </form>
        </>
    );
}

export default SignUpForm;
