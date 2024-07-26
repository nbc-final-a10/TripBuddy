import React from 'react';

export default function MyTrips() {
    return (
        <div className="mt-4 rounded-lg bg-gray-100">
            <div className="py-5 border-b border-gray-200 mx-4">
                <details className="group">
                    <summary className="flex justify-center items-center font-medium cursor-pointer list-none">
                        <span className="text-center xl:text-xl">
                            참여중인 여정
                        </span>
                        <span className="transition group-open:rotate-180 ml-auto">
                            <svg
                                fill="none"
                                height="24"
                                shapeRendering="geometricPrecision"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        여정1 내용
                        <br />
                        여정2 내용
                        <br />
                        여정3 내용
                    </p>
                </details>
            </div>
            <div className="py-5  mx-4">
                <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-center xl:text-xl">
                            내가 만든 여정
                        </span>
                        <span className="transition group-open:rotate-180 ml-2">
                            <svg
                                fill="none"
                                height="24"
                                shapeRendering="geometricPrecision"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                width="24"
                            >
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </summary>
                    <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        여정A 내용
                        <br />
                        여정B 내용
                        <br />
                        여정C 내용
                    </p>
                </details>
            </div>
        </div>
    );
}
