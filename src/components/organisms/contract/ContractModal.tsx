'use client';

import BuddyProfile from '@/components/molecules/profile/BuddyProfile';
import { useModal } from '@/contexts/modal.context';
import { useNotificationMutation } from '@/hooks/queries';
import { Buddy } from '@/types/Auth.types';
import { Notification } from '@/types/Notification.types';
import React from 'react';

type ContractModalProps = {
    buddies: Buddy[];
    mode?: 'default' | 'notification';
    notifications: Notification[];
};

const ContractModal: React.FC<ContractModalProps> = ({
    buddies,
    mode,
    notifications,
}) => {
    const modal = useModal();

    const { mutate } = useNotificationMutation();

    const handleCancel = () => {
        // 컨트랙트를 삭제해야함
        // 그러려면 buddyID 로 컨트랙트 테이블 조회
        // 그러면 관련된 컨트랙츠와 트립스를 보내줌
        modal.closeModal();
    };

    const handleClose = () => {
        modal.closeModal();
    };

    return (
        <div className="bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[9999]">
            <dialog open className="rounded-xl z-50">
                <div className="bg-white w-full min-h-[250px] max-h-[250px] py-2 rounded-lg flex flex-col justify-center items-center gap-3 transition-all duration-300">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <BuddyProfile
                            clickedBuddy={buddies[0]}
                            loading={false}
                            mode={mode}
                        />

                        <div className="flex flex-row gap-3">
                            <button
                                // className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md focus-visible:outline-none"
                                className="bg-white text-primary-color-400 border-primary-color-400 rounded-xl border w-[48%] py-2 px-8"
                                onClick={handleCancel}
                            >
                                거절하기
                            </button>

                            <button
                                className="bg-primary-color-400 text-white border-primary-color-400 rounded-xl border w-[48%] py-2 px-8"
                                onClick={handleClose}
                            >
                                수락하기
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ContractModal;
