import { useState, useEffect } from 'react';

const useTimeAgo = (timestamp: string): string => {
    const [timeAgo, setTimeAgo] = useState(() => calculateTimeAgo(timestamp));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeAgo(calculateTimeAgo(timestamp));
        }, 60000); // обновляем каждую минуту

        return () => clearInterval(intervalId); // очищаем таймер при размонтировании
    }, [timestamp]);

    return timeAgo;
};

const calculateTimeAgo = (timestamp: string): string => {
    if (!timestamp) return 'just now';

    const timeDiff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(timeDiff / 60000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(months / 12);
    return `${years} years ago`;
};

export default useTimeAgo;
