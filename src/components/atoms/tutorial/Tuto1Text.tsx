import React from 'react';

type Tuto1TextProps = {
    title: string;
};

const Tuto1Text: React.FC<Tuto1TextProps> = ({ title }) => {
    return (
        <div className="mt-10 text-center absolute top-0 left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
};

export default Tuto1Text;
