import React from 'react';

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <>{children}</>;
};

export default AuthenticatedLayout;
