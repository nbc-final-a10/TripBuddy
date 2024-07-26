import React from 'react';
import Title from './TutoTitle';

interface Tuto1TextProps {
    title: string;
}

const Tuto4Text: React.FC<Tuto1TextProps> = ({ title }) => {
    return (
        <div>
            <Title text={title} />
        </div>
    );
};

export default Tuto4Text;
