import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import React, { useState } from 'react';
import { Descendant } from 'slate';

// slate.js용 type
// const initialContent: Descendant[] = [
//     {
//         type: 'paragraph',
//         children: [{ text: '' }],
//     },
// ];

// Todo: useRef에서 forwardRef로 부모 페이지 컴포넌트에서부터 내리는 방법 (19 버전부터 '코드가' 없어짐, 기능이 자동 탑재됨) -> 아니면 커스텀 훅

export default function WriteTrip() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    // Todo : 페이지 컴포넌트로 빠져야 함 -> 이 페이지에서는 Props로 함수만 전달 받기
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Todo: 게시글 작성 로직 추가
        console.log('Title:', title);
        console.log('Content:', JSON.stringify(content));
    };

    return (
        <div className="p-4">
            <header className="mb-5">
                <Left2xlBoldText text="모집 글을 작성해봐요!" />
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        대표 이미지
                    </label>
                    <button className="flex items-center justify-center w-20 h-20 bg-gray-200 border border-gray-300 rounded">
                        <span className="text-gray-400">📷</span>
                    </button>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        제목
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="제목"
                        maxLength={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    <span className="block text-right text-sm text-gray-500">{`${title.length}/20`}</span>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        글 내용
                    </label>
                    <textarea
                        value={content}
                        onChange={handleContentChange}
                        placeholder="내용을 입력해주세요."
                        className="w-full h-96 px-3 py-2 border border-gray-300 rounded resize-none"
                    />

                    {/* Todo: SlateEditor UT 이후 추후 구현 */}
                    {/* <SlateEditor
                        value={content}
                        onChange={handleContentChange}
                    /> */}
                </div>
                {/* <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        제출 테스트 버튼
                    </button>
                </div> */}
            </form>
        </div>
    );
}
