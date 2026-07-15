export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
) => {
    let inThrottle = false;
    return function(this: any, ...args: Parameters<T>) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
};
