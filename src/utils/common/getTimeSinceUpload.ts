export function getTimeSinceUpload(tripCreatedAt: string): string {
    const now = new Date();
    const createdAt = new Date(tripCreatedAt);
    const diffInMs = now.getTime() - createdAt.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
        return '방금';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    } else {
        return `${diffInDays}일 전`;
    }
}
