'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

const DraggableInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState<string>('');
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [texts, setTexts] = useState<
        { text: string; position: { x: number; y: number } }[]
    >([]);

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newText = { text, position };
        setTexts([...texts, newText]);
        setText('');
    };

    useLayoutEffect(() => {
        setTimeout(() => {
            if (divRef.current) {
                setPosition({
                    x: divRef.current.clientWidth / 8,
                    y: divRef.current.clientHeight / 8,
                });
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }
        }, 0);
    }, []);

    return (
        <div className="absolute w-full h-full" ref={divRef}>
            <Draggable
                scale={2}
                position={position}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <form className="absolute z-10" onSubmit={handleSave}>
                    <input
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        ref={inputRef}
                        style={{
                            top: position.y,
                            left: position.x,
                        }}
                        className="relative text-white p-2 ring-offset-background focus:border-b-2 focus:border-gray-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-white focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
                    />
                </form>
            </Draggable>
            {texts.map((text, index) => (
                <p
                    key={index}
                    className="absolute text-white z-10"
                    style={{
                        top: text.position.y,
                        left: text.position.x,
                        transform: `translate(${text.position.x}px, ${text.position.y}px)`,
                    }}
                >
                    {text.text}
                </p>
            ))}
            <button className="absolute bg-main-color text-white px-2 pt-0.5 pb-1.5 rounded-md top-0 right-0 z-10 leading-none">
                save
            </button>
        </div>
    );
};

export default DraggableInput;
