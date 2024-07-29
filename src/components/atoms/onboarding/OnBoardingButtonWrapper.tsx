import { PropsWithChildren } from 'react';

const OnBoardingButtonWrapper = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col gap-4 w-full h-[80%] items-center justify-center">
            {children}
        </div>
    );
};

export default OnBoardingButtonWrapper;