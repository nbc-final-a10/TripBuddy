'use client';

import EditProfilePage from '@/components/organisms/profile/EditProfilePage';
import { useAuth } from '@/hooks';

function EditBuddyProfilePage() {
    const { buddy } = useAuth();

    return (
        <div>
            {buddy ? <EditProfilePage buddy={buddy} /> : <div>Loading...</div>}
        </div>
    );
}

export default EditBuddyProfilePage;
