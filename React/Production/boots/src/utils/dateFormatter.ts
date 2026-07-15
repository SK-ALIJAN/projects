export const formatDate = (date: Date | string | number, locale = 'en-US', options?: Intl.DateTimeFormatOptions): string => {
    try {
        const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
        if (isNaN(d.getTime())) return '';
        
        const defaultOptions: Intl.DateTimeFormatOptions = options || {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        
        return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
    } catch (e) {
        console.error('Date format error:', e);
        return '';
    }
};

export const formatRelativeTime = (timestamp: number | string | Date, locale = 'en'): string => {
    try {
        const date = typeof timestamp === 'string' || typeof timestamp === 'number' ? new Date(timestamp) : timestamp;
        if (isNaN(date.getTime())) return '';

        const now = new Date();
        const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
        
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
        
        const absoluteDiff = Math.abs(diffInSeconds);
        
        if (absoluteDiff < 60) {
            return rtf.format(diffInSeconds, 'second');
        }
        
        const diffInMinutes = Math.round(diffInSeconds / 60);
        if (Math.abs(diffInMinutes) < 60) {
            return rtf.format(diffInMinutes, 'minute');
        }
        
        const diffInHours = Math.round(diffInMinutes / 60);
        if (Math.abs(diffInHours) < 24) {
            return rtf.format(diffInHours, 'hour');
        }
        
        const diffInDays = Math.round(diffInHours / 24);
        return rtf.format(diffInDays, 'day');
    } catch (e) {
        console.error('Relative time format error:', e);
        return '';
    }
};
