import React from 'react';

type ParagraphProps = {
    children: React.ReactNode;
    className?: string;
};

const Paragraph: React.FC<ParagraphProps> = ({ children, className }) => {
    return (
        <div className="flex flex-col gap-2 w-full items-center justify-center">
            <p
                className={`text-gray-500 ${className} whitespace-pre-wrap text-center`}
            >
                {children}
            </p>
        </div>
    );
};

export default Paragraph;
