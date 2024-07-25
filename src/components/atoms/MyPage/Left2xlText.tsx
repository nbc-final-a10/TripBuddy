import React from 'react';

type Left2xlBoldTextProps = {
    text: string;
};

export default function Left2xlBoldText({ text }: Left2xlBoldTextProps) {
    return (
        <div>
            <p className="text-2xl mt-8 xl:text-4xl xl:mt-8 font-bold">
                {text}
            </p>
        </div>
    );
}
