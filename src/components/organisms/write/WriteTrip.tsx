'use client';

import React from 'react';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';

const WriteTrip: React.FC<{
    tripTitle: string;
    tripContent: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ tripTitle, tripContent, handleTitleChange, handleContentChange }) => {
    return (
        <div className="p-4">
            <header className="mb-5">
                <Left2xlBoldText text="모집 글을 작성해봐요!" />
            </header>

            <form className="space-y-4">
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
                        value={tripTitle}
                        onChange={handleTitleChange}
                        placeholder="제목"
                        maxLength={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    <span className="block text-right text-sm text-gray-500">{`${tripTitle.length}/20`}</span>
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        글 내용
                    </label>
                    <textarea
                        value={tripContent}
                        onChange={handleContentChange}
                        placeholder="내용을 입력해주세요."
                        className="w-full h-96 px-3 py-2 border border-gray-300 rounded resize-none"
                    />
                </div>
            </form>
        </div>
    );
};

export default WriteTrip;
