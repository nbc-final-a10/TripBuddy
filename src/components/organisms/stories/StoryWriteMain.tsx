'use client';

import React, { useState } from 'react';
import StorySelectMedia from './StorySelectMedia';
import StoryWriteText from './StoryWriteText';

const StoryWriteMain: React.FC = () => {
    const [step, setStep] = useState<number>(1);

    return (
        <div>
            {step === 0 && <StorySelectMedia />}
            {step === 1 && <StoryWriteText />}
        </div>
    );
};

export default StoryWriteMain;
