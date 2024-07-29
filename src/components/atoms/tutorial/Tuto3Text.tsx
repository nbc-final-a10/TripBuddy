import React from 'react';
import Title from './TutoTitle';

type Tuto3TextProps = {
    title: string;
};

const Tuto3Text: React.FC<Tuto3TextProps> = ({ title }) => {
    return (
        <div>
            <Title text={title} />
        </div>
    );
};

export default Tuto3Text;
