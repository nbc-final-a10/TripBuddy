import { Tables } from './supabase';

// export type Trip = Tables<'trips'>;

// export type Contract = Tables<'contract'>;

// export type Buddy = Tables<'buddies'>;

export type Message = Tables<'messages'>;

export type Trip = {
    trip_id: string;
    trip_title: string;
};

export type Contract = {
    contract_id: string;
    contract_buddy_id: string;
    contract_trip_id: string;
};

export type Buddy = {
    buddy_id: string;
    buddy_profile_pic: string;
};
