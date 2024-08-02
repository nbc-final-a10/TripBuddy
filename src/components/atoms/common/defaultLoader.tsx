const DefaultLoader = () => {
    return (
        <div>
            <div className="fixed flex items-center justify-center h-dvh w-dvw top-0 left-0 z-50">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-main-color"
                    role="status"
                ></div>
            </div>
        </div>
    );
};

export default DefaultLoader;
