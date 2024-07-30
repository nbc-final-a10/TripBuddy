'use client';

import React, { useState } from 'react';

function useTripWrite() {
    const [tripTitle, setTripTitle] = useState('');
    const [tripContent, setTripContent] = useState('');
    const [tripImage, setTripImage] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTripTitle(e.target.value);
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTripContent(e.target.value);
    };

    return {
        tripTitle,
        tripContent,
        tripImage,
        handleTitleChange,
        handleContentChange,
    };
}

export default useTripWrite;
