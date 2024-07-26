import React from 'react';
import Title from './TutoTitle';

interface Tuto1TextProps {
    title: string;
}

const Tuto5Text: React.FC<Tuto1TextProps> = ({ title }) => {
    return (
        <div>
            <Title text={title} />
        </div>
    );
};

export default Tuto5Text;
