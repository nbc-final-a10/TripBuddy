const MainPageStories = () => {
    const stories = Array.from(
        { length: 5 },
        (_, index) => `스토리 ${index + 1}`,
    );
    return (
        <>
            {stories.map((story, index) => (
                <div
                    key={index}
                    className="min-w-[145px] h-[190px] p-[12px] rounded-md bg-gray-200"
                >
                    {story}
                </div>
            ))}
        </>
    );
};

export default MainPageStories;
