'use client';

import { StoryFilter, StoryOverlay } from '@/types/Story.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type DraggableInputProps = {
    texts: StoryOverlay[];
    setTexts: (texts: StoryOverlay[]) => void;
    selectedFilter: StoryFilter;
};

const DraggableInput = ({
    texts,
    setTexts,
    selectedFilter,
}: DraggableInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState<string>('');
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const handleDrag = (e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPosition = {
            x: position.x + 4,
            y: position.y + 2,
        };
        const newText = { text, position: newPosition, filter: selectedFilter };
        setTexts([...texts, newText]);
        setText('');

        if (inputRef.current) {
            inputRef.current.style.top = `${position.y + 20}px`;
            setPosition({ x: position.x, y: position.y + 20 });
            inputRef.current.focus();
        }
        if (buttonRef.current) {
            buttonRef.current.style.top = `${position.y + 20}px`;
            setPosition({ x: position.x, y: position.y + 20 });
        }
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

    useEffect(() => {
        if (text) {
            if (text.length > 20) {
                showAlert('caution', '20자 이하로 작성해주세요.');
                setText('');
            }
        }
    }, [text]);

    return (
        <div className="absolute w-full h-full" ref={divRef}>
            <Draggable
                scale={2}
                position={position}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <form
                    className="absolute z-10 flex flex-row gap-1 "
                    onSubmit={handleSave}
                >
                    <input
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        ref={inputRef}
                        style={{
                            top: position.y,
                            left: position.x,
                        }}
                        className="relative text-white px-2 py-1 ring-offset-background focus:border-b-2 focus:border-gray-200 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-white focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
                    />
                    <button
                        type="submit"
                        className="relative text-white bg-main-color px-2 py-1 rounded-md"
                        ref={buttonRef}
                        style={{
                            top: position.y,
                            left: position.x,
                        }}
                    >
                        완료
                    </button>
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
        </div>
    );
};

export default DraggableInput;
