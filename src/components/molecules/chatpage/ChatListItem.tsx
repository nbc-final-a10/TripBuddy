import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ChatListItemProps = {
    contract_id: string;
    contract_trip_id: string;
    trip_title: string;
    contract_buddies_profiles?: string[];
    last_message_content?: string;
    last_message_time?: string;
};

const ChatListItem: React.FC<ChatListItemProps> = ({
    contract_id,
    contract_trip_id,
    trip_title,
    contract_buddies_profiles = [],
    last_message_content,
    last_message_time,
}) => {
    const renderProfilePictures = () => {
        return contract_buddies_profiles.map((profilePic, index) => (
            <div
                key={index}
                className={`rounded-full w-[23px] h-[23px] bg-[#d9d9d9] overflow-hidden flex items-center justify-center border-1 border-white ${index === 1 || 3 ? 'ml-[-5px]' : ''} ${index === 3 || 4 ? 'mt-[-5px]' : ''}`}
            >
                {profilePic && (
                    <Image
                        src={profilePic}
                        alt="Profile"
                        width={23}
                        height={23}
                        className="object-cover"
                    />
                )}
            </div>
        ));
    };

    return (
        <Link href={`/chat/${contract_trip_id}`}>
            <div className="flex justify-between items-center p-2 border-b border-grayscale-color-50 hover:bg-grayscale-color-200">
                <div className="w-[45px] flex items-center justify-center flex-wrap">
                    {renderProfilePictures()}
                </div>
                <div className="flex flex-col flex-grow pl-2">
                    <p className="text-[16px] font-bold text-grayscale-color-800">
                        {trip_title}
                    </p>
                    <p className="text-[14px] font-medium text-grayscale-color-500">
                        {last_message_content || 'No messages yet'}
                    </p>
                </div>
                <div className="flex flex-col justify-between">
                    <span className="text-center text-[14px] font-medium text-grayscale-color-600">
                        {last_message_time}
                    </span>
                    <span className="text-center text-[12px] font-semibold text-white bg-secondary-color-300 rounded-[40px] px-[7px] py-[4px]">{`+300`}</span>
                </div>
            </div>
        </Link>
    );
};

export default ChatListItem;
