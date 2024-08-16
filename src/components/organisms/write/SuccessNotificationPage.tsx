import React from 'react';
import CompletePage from './CompletePage';
import FailPage from './FailPage';
import PendingPage from './PendingPage';

interface SuccessNotificationProps {
    isSuccess: boolean | null;
}

const SuccessNotificationPage: React.FC<SuccessNotificationProps> = ({
    isSuccess,
}) => {
    return (
        <div className="text-center">
            {isSuccess === null ? (
                <>
                    <PendingPage />
                </>
            ) : isSuccess ? (
                <CompletePage />
            ) : (
                <FailPage />
            )}
        </div>
    );
};

export default SuccessNotificationPage;
