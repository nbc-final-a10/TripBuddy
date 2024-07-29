import React from 'react';

type O_ParagraphProps = {
    children: React.ReactNode;
};

const Paragraph: React.FC<O_ParagraphProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-2 w-full items-center justify-center">
            <p className="text-gray-500">{children}</p>
        </div>
    );
};

export default Paragraph;
