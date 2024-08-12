'use client';

import { useAuth } from '@/hooks/auth';
import Settings from '../../../../public/svg/Settings.svg';
import { useRouter } from 'next/navigation';

type MobileHeaderSettingsButtonProps = {
    uuid: string;
};

const MobileHeaderSettingsButton = ({
    uuid,
}: MobileHeaderSettingsButtonProps) => {
    // const id = pathname.split('/').pop();
    const { buddy } = useAuth();
    const router = useRouter();

    const isShow = uuid === buddy?.buddy_id;

    if (!isShow) return null;

    return (
        <Settings
            className="cursor-pointer"
            onClick={() => router.push(`/onboarding`)}
        />
    );
};

export default MobileHeaderSettingsButton;
