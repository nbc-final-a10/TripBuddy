'use client';

import React from 'react';
import Left2xlBoldText from '@/components/atoms/write/Left2xlText';
import Image from 'next/image';

type WriteTripProps = {
    tripTitle: string;
    tripContent: string;
    tripImage: string;
    tripImageFile: File | null;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const WriteTrip: React.FC<WriteTripProps> = ({
    tripTitle,
    tripContent,
    tripImage,
    tripImageFile,
    handleTitleChange,
    handleContentChange,
    handleImageChange,
}) => {
    return (
        <div className="p-4">
            <header className="mb-5">
                <Left2xlBoldText text="모집 글을 작성해봐요!" />
            </header>

            <form className="space-y-4">
                <div className="flex items-center">
                    <label className="block mb-1 text-sm font-medium text-gray-700 mr-2">
                        대표 이미지
                    </label>
                    <input
                        type="file"
                        className="flex items-center justify-center w-20 h-20 bg-gray-200 border border-gray-300 rounded mr-2"
                        onChange={handleImageChange}
                    />
                    <Image
                        src={tripImage}
                        width={100}
                        height={100}
                        alt="tripImage"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        제목
                    </label>
                    <input
                        type="text"
                        value={tripTitle}
                        onChange={handleTitleChange}
                        placeholder="제목을 입력해주세요."
                        maxLength={20}
                        className="w-full px-3 py-2 bg-[#E8E8E8] border border-[#E8E8E8] rounded-xl"
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
                        className="w-full h-96 px-3 py-2 bg-[#E8E8E8] border border-[#E8E8E8] rounded-xl resize-none"
                    />
                </div>
            </form>
        </div>
    );
};

export default WriteTrip;
