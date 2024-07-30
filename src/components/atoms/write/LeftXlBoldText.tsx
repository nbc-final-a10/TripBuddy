import React from 'react';

type LeftXlBoldTextProps = {
    text: string;
};

export default function LeftXlBoldText({ text }: LeftXlBoldTextProps) {
    return (
        <div>
            <p className="text-xl mt-8 ml-2 xl:text-3xl xl:mt-8 xl:ml-2 font-bold">
                {text}
            </p>
        </div>
    );
}
