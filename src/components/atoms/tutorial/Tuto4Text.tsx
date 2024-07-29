import React from 'react';
import Title from './TutoTitle';

type Tuto4TextProps = {
    title: string;
};

const Tuto4Text: React.FC<Tuto4TextProps> = ({ title }) => {
    return (
        <div>
            <Title text={title} />
        </div>
    );
};

export default Tuto4Text;
