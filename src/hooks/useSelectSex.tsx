'use client';

import React, { useState } from 'react';

function useSelectSex() {
    const [wantedSex, setWantedSex] = useState();

    const SelectWantedSexButton = () => {
        return (
            <div>
                <button>남자</button>
                <button>여자</button>
            </div>
        );
    };

    return { SelectWantedSexButton, wantedSex };
}

export default useSelectSex;
