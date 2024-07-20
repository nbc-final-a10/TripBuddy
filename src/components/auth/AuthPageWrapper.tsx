import React from "react";

function AuthPageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center min-h-dvh bg-gray-50 max-w-[375px] mx-auto">
            <section className="h-dvh w-full flex flex-col items-center justify-center my-0 mx-auto bg-white">
                <div className="h-full w-full flex flex-col items-center justify-center gap-10">
                    {children}
                </div>
            </section>
        </div>
    );
}

export default AuthPageWrapper;
