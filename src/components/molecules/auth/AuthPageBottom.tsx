"use client";
import GoogleLogInButton from "../../atoms/GoogleLogInButton";
import KaKaoLogInButton from "../../atoms/KaKaoLogInButton";

function AuthPageBottom() {
    return (
        <>
            <div className="w-full flex items-center justify-center gap-2">
                <hr className="w-28 border-gray-400" />
                <p className="text-sm text-gray-500">SNS 계정으로 로그인</p>
                <hr className="w-28 border-gray-400" />
            </div>

            <div className="flex items-center justify-center gap-8">
                <GoogleLogInButton />
                <KaKaoLogInButton />
            </div>
        </>
    );
}

export default AuthPageBottom;
