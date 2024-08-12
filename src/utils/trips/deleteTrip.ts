import { showAlert } from '../ui/openCustomAlert';
import { NextRouter } from 'next/router';

export async function deleteTrip(
    tripId: string,
    token: string,
    router: NextRouter,
): Promise<void> {
    try {
        const response = await fetch(`/api/contract/trip/${tripId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '여정 삭제에 실패했습니다.');
        }

        const data = await response.json();
        console.log(data.message);
        showAlert('success', '여정이 삭제되었습니다.');
        router.push('/trips');
    } catch (error: unknown) {
        showAlert(
            'error',
            (error as Error).message || '여정 삭제에 실패했습니다.',
        );
    }
}
