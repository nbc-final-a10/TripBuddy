import React from 'react';
import Title from './TutoTitle';

interface Tuto1TextProps {
    title: string;
}

const Tuto3Text: React.FC<Tuto1TextProps> = ({ title }) => {
    return (
        <div>
            <Title text={title} />
        </div>
    );
};

export default Tuto3Text;
