'use client';

import { useAuth } from '@/hooks/auth';
import Settings from '../../../../public/svg/Settings.svg';

type MobileHeaderSettingsButtonProps = {
    pathname: string;
};

const MobileHeaderSettingsButton = ({
    pathname,
}: MobileHeaderSettingsButtonProps) => {
    const id = pathname.split('/').pop();
    const { buddy } = useAuth();

    const isShow = id === buddy?.buddy_id;

    if (!isShow) return null;

    return <Settings />;
};

export default MobileHeaderSettingsButton;
