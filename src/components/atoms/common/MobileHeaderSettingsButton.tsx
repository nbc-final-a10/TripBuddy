'use client';

import { useAuth } from '@/hooks/auth';
import Settings from '../../../../public/svg/Settings.svg';
import { useRouter } from 'next/navigation';

type MobileHeaderSettingsButtonProps = {
    pathname: string;
};

const MobileHeaderSettingsButton = ({
    pathname,
}: MobileHeaderSettingsButtonProps) => {
    const id = pathname.split('/').pop();
    const { buddy } = useAuth();
    const router = useRouter();

    const isShow = id === buddy?.buddy_id;

    if (!isShow) return null;

    return (
        <Settings onClick={() => router.push(`/profile/${buddy?.buddy_id}`)} />
    );
};

export default MobileHeaderSettingsButton;