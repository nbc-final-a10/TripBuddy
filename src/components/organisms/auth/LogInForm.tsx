"use client";

import { useAuth } from "@/hooks/auth.hooks";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "../../atoms/common/O_Input";
import { SubmitButton } from "../../atoms/common/O_Submit-button";

function LogInForm() {
    const { isPending, logIn, sendingResetEmail } = useAuth();
    const searchParams = useSearchParams();
    const search = searchParams.get("mode");
    const [isRecoverPassword, setIsRecoverPassword] = useState(search === "recover");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // if (!email || !password) return showAlert("caution", "이메일, 비밀번호를 모두 입력해주세요");
        // if (/\s/.test(email) || /\s/.test(password)) return showAlert("caution", "공백을 포함할 수 없습니다!");
        // if (!emailRegex.test(email)) return showAlert("caution", "유효한 이메일 주소를 입력하세요!");
        // if (password.length < 8 || password.length > 15) return showAlert("caution", "비밀번호는 8~15 글자로 해야합니다!");

        logIn(email, password);
        form.reset();
    };

    const handleRecoverPassword = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email") as string;

        // if (!email) return showAlert("caution", "빈 값이 없도록 해주세요");
        // if (/\s/.test(email)) return showAlert("caution", "공백을 포함할 수 없습니다!");
        // if (!emailRegex.test(email)) return showAlert("caution", "유효한 이메일 주소를 입력하세요!");

        sendingResetEmail(email);
        form.reset();
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 pb-6">
                <h1 className="text-2xl font-Pretendard-Regular font-bold">
                    {isRecoverPassword ? "비밀번호 복구" : "로그인"}
                </h1>
                <p className="text-sm font-Pretendard-Regular text-gray-500">
                    {isRecoverPassword ? "Recover your password" : "Sign up to continue using our App"}
                </p>
            </div>

            <form
                onSubmit={isRecoverPassword ? handleRecoverPassword : handleSubmit}
                className="w-full h-fit min-h-[35%] flex flex-col items-center justify-center gap-10"
            >
                <div className="w-[90%] flex flex-col items-center justify-center font-Pretendard-Regular gap-10">
                    <Input type="text" placeholder="email" name="email" />

                    {isRecoverPassword ? null : (
                        <div className={clsx("w-full flex flex-col gap-1", isRecoverPassword && "gap-4")}>
                            <Input type="password" placeholder="password" name="password" />

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
                    className="bg-sky-200 w-[70%] text-white rounded-lg px-4 py-2 text-foreground"
                    type="submit"
                    pendingText="로딩..."
                    pending={isPending}
                >
                    {isRecoverPassword ? "복구메일보내기" : "로그인하기"}
                </SubmitButton>
            </form>
        </>
    );
}
export default LogInForm;

// const createQueryString = useCallback(
//     (name: string, value: string) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set(name, value);

//         return params.toString();
//     },
//     [searchParams]
// );

// useEffect(() => {
//     if (!isRecoverPassword) router.push(pathname + "?" + createQueryString("mode", "login"));
//     else router.push(pathname + "?" + createQueryString("mode", "recover"));
// }, [pathname, createQueryString, router, isRecoverPassword]);

// // 이벤트
// useEffect(() => {
//     if (!router) return;
//     const handlePopState = () => {
//         router.push("/login?mode=login");
//         setIsRecoverPassword(false);
//     };
//     window.addEventListener("popstate", handlePopState);
//     return () => {
//         window.removeEventListener("popstate", handlePopState);
//     };
// }, [router]);
