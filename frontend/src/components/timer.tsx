import { useState, useEffect } from "react";

type TimerProps = {
    start: number;
    isActive: boolean;
};

function Timer({ start, isActive }: TimerProps) {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (!isActive) return;
        const timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - start) / 1000));
        }, 1000);

        return () => clearInterval(timer);
    }, [start, isActive]);

    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    const format = (num: number) => String(num).padStart(2, '0');

    return (
        <h2>
            {`⏰`}
            {hours > 0 ? `${format(hours)}:` : ''}
            {format(minutes)}:{format(seconds)}
        </h2>
    );
}

export default Timer;