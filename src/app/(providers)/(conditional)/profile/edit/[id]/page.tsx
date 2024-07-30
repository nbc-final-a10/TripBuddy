import EditProfilePage from '@/components/organisms/profile/EditProfilePage';
import { ProfilePageProps } from '@/types/ProfileParams.types';

function EditBuddyProfilePage({ params }: ProfilePageProps) {
    return (
        <div>
            <EditProfilePage id={params.id} />
        </div>
    );
}

export default EditBuddyProfilePage;
