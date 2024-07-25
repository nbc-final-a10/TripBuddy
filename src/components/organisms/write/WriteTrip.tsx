import React, { useState } from 'react';

export default function WriteTrip() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 게시글 작성 로직 추가
    };

    return (
        <div className="p-4">
            <header className="mb-5">
                <h1 className="text-lg font-bold mt-4 mb-4 xl:text-4xl xl:mt-8 xl:mb-8">
                    모집 글을 작성해봐요!
                </h1>
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
                        placeholder="내용"
                        className="w-full px-3 py-2 border border-gray-300 rounded h-32"
                    ></textarea>
                </div>
            </form>
        </div>
    );
}
