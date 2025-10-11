import { jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
function Timer({ start, isActive }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    useEffect(() => {
        if (!isActive)
            return;
        const timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - start) / 1000));
        }, 1000);
        return () => clearInterval(timer);
    }, [start, isActive]);
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    const format = (num) => String(num).padStart(2, '0');
    return (_jsxs("h2", { children: [`⏰`, hours > 0 ? `${format(hours)}:` : '', format(minutes), ":", format(seconds)] }));
}
export default Timer;
