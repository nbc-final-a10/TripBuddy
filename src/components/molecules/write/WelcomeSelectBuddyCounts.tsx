import { useState } from 'react';

export default function WelcomeSelectBuddyCounts() {
    const [count, setCount] = useState(1);

    return (
        <div className="flex flex-col items-center">
            <div className="flex mt-10 mb-2 text-2xl xl:text-4xl xl:mt-20 xl:mb-5">
                여정 인원을 선택해주세요
            </div>
            <div className="flex flex-col items-center text-gray-600 text-sm xl:text-lg mb-5 xl:mb-10">
                <p>최대 여정 인원은 4명까지 선택 가능해요.</p>
            </div>
            <div className="flex flex-row gap-[2px]">
                <button
                    className="text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center"
                    onClick={() => {
                        if (count > 1) {
                            setCount(count - 1);
                        }
                    }}
                    disabled={count === 1}
                >
                    -
                </button>
                <input
                    type="hidden"
                    className="md:p-2 p-1 text-xs md:text-base focus:outline-none text-center h-[24px]"
                    readOnly
                    name="custom-input-number"
                />
                <div className="bg-[#edeff1] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] text-[#647484] md:text-base flex items-center justify-center cursor-default">
                    <span>{count}</span>
                </div>
                <div className="buttons-wrap flex flex-col items-center gap-[2px]">
                    <button
                        className="text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center"
                        onClick={() => {
                            if (count < 5) {
                                setCount(count + 1);
                            }
                        }}
                        disabled={count === 4}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}
