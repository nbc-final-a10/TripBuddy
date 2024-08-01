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
    contract_buddies_profiles = [], // Default to empty array
    last_message_content,
    last_message_time,
}) => {
    const renderProfilePictures = () => {
        return contract_buddies_profiles.map((profilePic, index) => (
            <div
                key={index}
                className="rounded-full w-[23px] h-[23px] bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-white"
                style={{ marginLeft: index === 0 ? '0' : '-10px' }}
            >
                <Image src={profilePic} alt="Profile" width={23} height={23} />
            </div>
        ));
    };

    return (
        <Link href={`/chat/${contract_trip_id}`}>
            <div className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-50">
                <div className="w-[45px] flex items-center justify-center">
                    {renderProfilePictures()}
                </div>
                <div className="flex flex-col flex-grow pl-2">
                    <p className="text-sm font-bold">{trip_title}</p>
                    <p className="text-xs text-gray-500">
                        {last_message_content || 'No messages yet'}
                    </p>
                </div>
                <div className="text-xs flex flex-col items-end">
                    <span>{last_message_time}</span>
                </div>
            </div>
        </Link>
    );
};

export default ChatListItem;
