import React from 'react';
import Title from './TutoTitle';

type Tuto5TextProps = {
    title: string;
};

const Tuto5Text: React.FC<Tuto5TextProps> = ({ title }) => {
    return (
        <div>
            <Title text={title} />
        </div>
    );
};

export default Tuto5Text;
