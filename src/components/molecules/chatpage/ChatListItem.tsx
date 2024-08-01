import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ChatListItemProps = {
    contract_id: string;
    contract_trip_id: string;
    trip_title: string;
    contract_buddies_profiles: string[];
};

const ChatListItem: React.FC<ChatListItemProps> = ({
    contract_id,
    contract_trip_id,
    trip_title,
    contract_buddies_profiles,
}) => {
    // Render profile pictures as small circles
    const renderProfilePictures = () => {
        return contract_buddies_profiles.map((profilePic, index) => (
            <div
                key={index}
                className="w-[30px] h-[30px] bg-gray-100 rounded-full overflow-hidden flex items-center justify-center border-2 border-white"
                style={{ marginLeft: index === 0 ? '0' : '-10px' }}
            >
                <Image src={profilePic} alt="Profile" width={10} height={10} />
            </div>
        ));
    };

    return (
        <Link href={`/chat/${contract_trip_id}`}>
            <div className="flex justify-between items-center p-2 border-b border-gray-200 hover:bg-gray-50 transition">
                <div className="flex items-center space-x-2">
                    {renderProfilePictures()}
                </div>
                <div className="flex flex-col flex-grow pl-2">
                    <p className="text-sm font-bold">{trip_title}</p>
                    <p className="text-xs text-gray-500">last message</p>
                </div>
                <div className="text-xs flex flex-col items-end">
                    <span>19:02</span>
                    <span className="rounded-[16px] flex items-center justify-center bg-gray-300 p-1">
                        +3
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ChatListItem;
