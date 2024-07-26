import Image from 'next/image';

const MessageInput = () => {
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] bg-white border-gray-200 flex justify-around items-center p-2">
            <button className="w-[28px] h-[28px] flex items-center justify-center">
                <Image src="/svg/Plus.svg" alt="Plus" width="15" height="15" />
            </button>
            <input
                type="text"
                placeholder="메시지 작성 ..."
                className="outline-none w-[291px] h-[37px] bg-gray-100 rounded-[8px] text-xs p-2"
            ></input>
            <button className="w-[28px] h-[28px] flex items-center justify-center">
                <Image src="/svg/Send.svg" alt="Send" width="15" height="15" />
            </button>
        </div>
    );
};

export default MessageInput;
