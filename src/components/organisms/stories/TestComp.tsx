'use client';
import { useEffect, useRef, useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd';

export type TItemStatus = 'todo' | 'doing';

export type TItem = {
    id: string;
    status: TItemStatus;
    title: string;
};

export type TItems = {
    [key in TItemStatus]: TItem[];
};

const TestComp = () => {
    // --- Mock 데이터
    const items = [...Array(4)].map((_, i) => ({
        id: `${i}${i}${i}`,
        content: `item-${i}`,
    }));

    // --- requestAnimationFrame 초기화
    const [enabled, setEnabled] = useState(false);
    const [coordinates, setCoordinates] = useState<{
        [key: string]: { top: number; left: number };
    }>({});
    const draggedItemRef = useRef<HTMLDivElement | null>(null);

    // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
    const onDragEnd = ({ source, destination }: DropResult) => {
        // 유효하지 않는 곳으로 drag시 이벤트를 종료한다.
        if (!destination) return;

        // 드래그가 끝난 위치의 좌표를 설정합니다.
        if (draggedItemRef.current) {
            const rect = draggedItemRef.current.getBoundingClientRect();

            console.log(rect.left, rect.top);
            setCoordinates(prev => ({
                ...prev,
                [source.index]: { top: rect.top, left: rect.left },
            }));
            draggedItemRef.current = null; // 초기화
        }

        console.log('>>> source', source);
        console.log('>>> destination', destination);
    };

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    console.log(coordinates);

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
            onDragStart={initial => {
                const element = document.querySelector(
                    `[data-rfd-draggable-id="${initial.draggableId}"]`,
                );
                console.log('Dragged element:', element);
                if (element instanceof HTMLDivElement) {
                    draggedItemRef.current = element;
                }
            }}
        >
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={
                            'h-dvh ' +
                            (snapshot.isDraggingOver ? 'shadow-lg' : 'shadow')
                        }
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            position: 'absolute',
                                            top:
                                                coordinates[index]?.top ??
                                                'initial',
                                            left:
                                                coordinates[index]?.left ??
                                                'initial',
                                        }}
                                        className={
                                            '' +
                                            (snapshot.isDragging
                                                ? 'bg-opacity-90 shadow-2xl shadow-gray-400'
                                                : 'shadow')
                                        }
                                        data-rfd-draggable-id={item.id}
                                    >
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default TestComp;
