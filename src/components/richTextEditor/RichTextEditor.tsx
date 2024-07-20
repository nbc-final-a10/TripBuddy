'use client'

import { useRef } from 'react';

const RichTextEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (command: string, value: string | null = null) => {
    if (editorRef.current) {
      editorRef.current?.focus();
      document.execCommand(command, false, value!);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <button onClick={() => execCmd('bold')} className="bg-gray-200 px-4 py-2 rounded">
          볼드
        </button>
        <button onClick={() => execCmd('italic')} className="bg-gray-200 px-4 py-2 rounded">
          이탈릭
        </button>
        <button onClick={() => execCmd('underline')} className="bg-gray-200 px-4 py-2 rounded">
          밑줄
        </button>
        <button onClick={() => execCmd('createLink', prompt('Enter the URL', 'http://'))} className="bg-gray-200 px-4 py-2 rounded">
          링크
        </button>
        <button onClick={() => execCmd('insertImage', prompt('Enter the image URL', 'http://'))} className="bg-gray-200 px-4 py-2 rounded">
          이미지
        </button>
        <button onClick={() => execCmd('formatBlock', '<pre>')} className="bg-gray-200 px-4 py-2 rounded">
          코드블록
        </button>
      </div>
      <div className="container mx-auto p-4">
        <button onClick={() => execCmd('insertUnorderedList')} className="bg-gray-200 px-4 py-2 rounded">
          번호없는 목록
        </button>
        <button onClick={() => execCmd('insertOrderedList')} className="bg-gray-200 px-4 py-2 rounded">
          번호있는 목록
        </button>
        <button onClick={() => execCmd('insertTable')} className="bg-gray-200 px-4 py-2 rounded">
          테이블
        </button>
        <button onClick={() => execCmd('insertHorizontalRule')} className="bg-gray-200 px-4 py-2 rounded">
          수평선
        </button>
        <button onClick={() => execCmd('insertLink')} className="bg-gray-200 px-4 py-2 rounded">
          링크
        </button>
        <button onClick={() => execCmd('insertUnlink')} className="bg-gray-200 px-4 py-2 rounded">
          링크삭제
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => execCmd('fontSize', '12')} className="bg-gray-200 px-4 py-2 rounded">
          글자크기
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="border p-4 min-h-[200px] max-h-[400px] overflow-y-auto"
      ></div>
    </div>
  );
};

export default RichTextEditor;