export const formatCurrency = (value: number, currency = 'USD', locale = 'en-US'): string => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        }).format(value);
    } catch (e) {
        console.error('Currency format error:', e);
        return '';
    }
};
