const HomePageTrips = () => {
    const trips = Array.from({ length: 5 }, (_, index) => `trip ${index + 1}`);
    return (
        <>
            {trips.map((trip, index) => (
                <div
                    key={index}
                    className="min-w-[201px] h-[192px] p-[12px] rounded-md bg-gray-200"
                >
                    {trip}
                </div>
            ))}
        </>
    );
};

export default HomePageTrips;
