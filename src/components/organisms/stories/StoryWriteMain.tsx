'use client';

import React, { useEffect, useState } from 'react';
import StorySelectMedia from './StorySelectMedia';
import StoryWriteText from './StoryWriteText';

const StoryWriteMain: React.FC = () => {
    const [step, setStep] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [selectedMedia, setSelectedMedia] = useState<string>('');

    const handleStep = () => {
        setStep(prev => prev + 1);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setSelectedMedia(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (!imageFile) return;
        handleStep();
    }, [imageFile]);

    return (
        <>
            {step === 0 && (
                <StorySelectMedia handleFileChange={handleFileChange} />
            )}
            {step === 1 && imageFile && (
                <StoryWriteText
                    imageFile={imageFile}
                    selectedMedia={selectedMedia}
                />
            )}
        </>
    );
};

export default StoryWriteMain;
