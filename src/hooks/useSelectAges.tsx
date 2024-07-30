'use client';

import React, { useState } from 'react';

function useSelectAges() {
    const [startAge, setStartAge] = useState<number>(18);
    const [endAge, setEndAge] = useState<number>(30);

    const handleStartAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartAge(parseInt(e.target.value, 10));
    };
    const handleEndAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndAge(parseInt(e.target.value, 10));
    };

    return { startAge, endAge, handleStartAge, handleEndAge };
}

export default useSelectAges;
