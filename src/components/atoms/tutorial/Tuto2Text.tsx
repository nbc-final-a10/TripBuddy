import React from 'react';
import Title from './TutoTitle';

type Tuto2TextProps = {
    title: string;
};

const Tuto2Text: React.FC<Tuto2TextProps> = ({ title }) => {
    return (
        <div>
            <Title text={title} />
        </div>
    );
};

export default Tuto2Text;
