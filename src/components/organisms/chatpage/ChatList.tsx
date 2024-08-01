'use client';
import ChatListItem from '@/components/molecules/chatpage/ChatListItem';
import React, { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import { useAuth } from '@/hooks/auth';

type Contract = {
    contract_id: string;
    contract_trip_id: string;
    contract_buddy_id: string;
    isPending: boolean;
    isValidate: boolean;
};

type BuddyProfile = {
    buddy_id: string;
    buddy_profile_pic: string;
};

type Trip = {
    trip_id: string;
    trip_title: string;
};

type ContractData = {
    contract_id: string;
    contract_trip_id: string;
    trip_title: string;
    contract_buddies_profiles: string[];
};

const ChatList = () => {
    const { buddy: currentBuddy } = useAuth();
    const [chatData, setChatData] = useState<ContractData[]>([]);

    useEffect(() => {
        const fetchContracts = async () => {
            const { data: contracts, error: contractsError } = await supabase
                .from<Contract>('contract')
                .select('contract_id, contract_trip_id')
                .eq('contract_buddy_id', currentBuddy.buddy_id)
                .eq('contract_isPending', false)
                .eq('contract_isValidate', true);

            if (contractsError) {
                console.error('Error fetching contracts:', contractsError);
                return;
            } else console.log('contracts fetch 성공', contracts);

            if (!contracts) return;

            const contractIds = contracts.map(contract => contract.contract_id);
            const tripIds = contracts.map(
                contract => contract.contract_trip_id,
            );

            const { data: allBuddies, error: allBuddiesError } = await supabase
                .from<Contract>('contract')
                .select('contract_buddy_id, contract_id, contract_trip_id')
                .in('contract_trip_id', tripIds);

            if (allBuddiesError) {
                console.error('Error fetching all buddies:', allBuddiesError);
                return;
            } else console.log('buddy fetch 성공!', allBuddies);

            const buddiesByTrip = new Map<string, Set<string>>();
            allBuddies.forEach(buddy => {
                if (!buddiesByTrip.has(buddy.contract_trip_id)) {
                    buddiesByTrip.set(
                        buddy.contract_trip_id,
                        new Set<string>(),
                    );
                }
                buddiesByTrip
                    .get(buddy.contract_trip_id)!
                    .add(buddy.contract_buddy_id);
            });

            const allBuddyIds = Array.from(
                new Set(allBuddies.map(buddy => buddy.contract_buddy_id)),
            );

            const { data: buddyProfiles, error: buddyError } = await supabase
                .from<BuddyProfile>('buddies')
                .select('buddy_id, buddy_profile_pic')
                .in('buddy_id', allBuddyIds);

            if (buddyError) {
                console.error('Error fetching buddy profiles:', buddyError);
                return;
            }

            if (!buddyProfiles) return;

            const buddyProfileMap = new Map<string, string>();
            buddyProfiles.forEach(profile => {
                buddyProfileMap.set(
                    profile.buddy_id,
                    profile.buddy_profile_pic,
                );
            });

            const { data: trips, error: tripError } = await supabase
                .from<Trip>('trips')
                .select('trip_id, trip_title')
                .in('trip_id', tripIds);

            if (tripError) {
                console.error('Error fetching trips:', tripError);
                return;
            }

            if (!trips) return;

            const tripTitleMap = new Map<string, string>();
            trips.forEach(trip => {
                tripTitleMap.set(trip.trip_id, trip.trip_title);
            });

            const contractDataMap = new Map<string, ContractData>();

            contracts.forEach(contract => {
                const { contract_id, contract_trip_id } = contract;

                if (!contractDataMap.has(contract_id)) {
                    contractDataMap.set(contract_id, {
                        contract_id,
                        contract_trip_id,
                        trip_title: tripTitleMap.get(contract_trip_id) || '',
                        contract_buddies_profiles: [],
                    });
                }

                const buddyIds =
                    buddiesByTrip.get(contract_trip_id) || new Set();
                const buddyProfiles = Array.from(buddyIds).map(
                    buddyId => buddyProfileMap.get(buddyId) || '',
                );

                const contractData = contractDataMap.get(contract_id);
                if (contractData) {
                    contractData.contract_buddies_profiles = buddyProfiles;
                }
            });

            // Convert Map to array
            const data = Array.from(contractDataMap.values());
            setChatData(data);
        };

        fetchContracts();
    }, [currentBuddy.buddy_id]);

    return (
        <div className="flex flex-col gap-5 p-4">
            {chatData.map(chat => (
                <ChatListItem
                    key={chat.contract_id}
                    contract_id={chat.contract_id}
                    contract_trip_id={chat.contract_trip_id}
                    trip_title={chat.trip_title}
                    contract_buddies_profiles={chat.contract_buddies_profiles}
                />
            ))}
        </div>
    );
};

export default ChatList;
