import React, { useState } from 'react';
import SearchPageChipsTitle from './SearchMainPageChipsTitle';

const PeopleCount: React.FC = () => {
    const [count, setCount] = useState(1);

    return (
        <>
            <div className="py-3">
                <SearchPageChipsTitle
                    title="인원수"
                    limit="인원수 최대 4명까지 가능해요"
                />
                <div className="flex justify-center items-center mx-auto flex-row gap-[2px] mt-5">
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
        </>
    );
};

export default PeopleCount;
