import React from 'react';

type LeftSmGrayTextProps = {
    text: string;
};

export default function LeftSmGrayText({ text }: LeftSmGrayTextProps) {
    return (
        <div>
            <p className="text-sm  ml-4 xl:ml-8 xl:text-xl text-gray-500">
                {text}
            </p>
        </div>
    );
}
