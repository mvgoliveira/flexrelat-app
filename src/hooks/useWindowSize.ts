import { useState, useEffect } from "react";

interface IWindowsSize {
    width: number;
    height: number;
}

const useWindowSize = (): IWindowsSize => {
    const [windowsSize, setWindowsSize] = useState<IWindowsSize>({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = (): void => {
            setWindowsSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowsSize;
};

export { useWindowSize };
