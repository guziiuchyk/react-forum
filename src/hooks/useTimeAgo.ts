import { useEffect, useState } from 'react';

const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(navigator.language, options).format(date);
};

const timeAgoOrDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const oneWeekInSeconds = 7 * 24 * 60 * 60;

    if (seconds > oneWeekInSeconds) {
        return formatDate(dateString);
    }

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        const elapsed = Math.floor(seconds / value);
        if (elapsed >= 1) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: 'auto' });
            return rtf.format(-elapsed, unit as Intl.RelativeTimeFormatUnit);
        }
    }

    return 'just now';
};

function useTimeAgo(dateString: string): string {
    const [timeAgo, setTimeAgo] = useState(() => timeAgoOrDate(dateString));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(timeAgoOrDate(dateString));
        }, 60000);

        return () => clearInterval(interval);
    }, [dateString]);

    return timeAgo;
}

export default useTimeAgo;
