const remainDays = (trip_start_date: string) => {
    const startDate = new Date(trip_start_date);
    const now = new Date();
    const timeDiff = startDate.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (days === 0) {
        return 'D-0';
    }
    return `D-${days}`;
};

export default remainDays;