import React from 'react';

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <div className="mt-10 text-center">
            <h1 className="text-2xl font-bold">{text}</h1>
        </div>
    );
};

export default Title;
