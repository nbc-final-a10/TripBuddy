'use client';

import React, { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

const DraggableText = () => {
    const [text, setText] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleSave = async () => {};

    return (
        <div className="relative w-full h-dvh">
            <Draggable
                scale={2}
                position={position}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{
                        top: position.y,
                        left: position.x,
                        transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute border-b-2 border-gray-300 rounded-md p-2"
                />
            </Draggable>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default DraggableText;
