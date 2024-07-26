import { PropsWithChildren } from 'react';

function AuthPageWrapper({ children }: PropsWithChildren) {
    return (
        <div className="flex absolute justify-center items-center bg-gray-50 w-full mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <section className="h-full w-full flex flex-col items-center justify-center my-0 mx-auto bg-white">
                <div className="h-full w-full flex flex-col items-center justify-center gap-10">
                    {children}
                </div>
            </section>
        </div>
    );
}

export default AuthPageWrapper;
