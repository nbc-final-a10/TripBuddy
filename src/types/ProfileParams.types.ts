type Params = {
    id: string;
};

type ProfilePageProps = {
    params: Params;
};

type BuddyProfileProps = {
    id?: string;
    isLabel?: boolean;
    isTempText?: boolean;
};

export type { Params, ProfilePageProps, BuddyProfileProps };
