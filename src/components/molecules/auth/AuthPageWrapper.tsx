import { PropsWithChildren } from 'react';

function AuthPageWrapper({ children }: PropsWithChildren) {
    return (
        <div className="relative flex justify-center items-center min-h-[calc(100dvh-57px)] w-full mx-auto bg-white">
            <section className="h-full w-full flex flex-col items-center justify-center my-0 mx-auto">
                <div className="h-full w-full flex flex-col items-center justify-center gap-10">
                    {children}
                </div>
            </section>
        </div>
    );
}

export default AuthPageWrapper;

// <div className="flex absolute justify-center items-center bg-gray-50 w-full mx-auto ">
// h-[calc(100dvh-57px)]
