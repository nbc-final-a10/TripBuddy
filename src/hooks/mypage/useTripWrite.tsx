'use client';

import React, { useState } from 'react';

export function useTripWrite() {
    const [tripTitle, setTripTitle] = useState('');
    const [tripContent, setTripContent] = useState('');
    const [tripImage, setTripImage] = useState(''); // 옵티미스틱용
    const [tripImageFile, setTripImageFile] = useState<File | null>(null); // 실제 업로드용

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTripTitle(e.target.value);
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTripContent(e.target.value);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setTripImage(objectUrl);
            setTripImageFile(file);
        }
    };

    return {
        tripTitle,
        tripContent,
        tripImage,
        tripImageFile,
        handleTitleChange,
        handleContentChange,
        handleImageChange,
    };
}
