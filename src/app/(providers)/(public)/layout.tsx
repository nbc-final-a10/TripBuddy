import MobileHeader from '@/components/molecules/common/MobileHeader';
import { getPathnameServer } from '@/utils/common/getPathnameServer';
import React from 'react';

type PublicLayoutProps = {
    children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return <>{children}</>;
};

export default PublicLayout;
