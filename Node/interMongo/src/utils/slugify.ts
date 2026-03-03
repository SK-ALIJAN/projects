/**
 * Convert a string into a URL-friendly slug
 */
export const slugify = (val: string | number): string => {
    return val
        .toString()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // remove special characters
        .trim()
        .replace(/\s+/g, '-')    // replace spaces with hyphens
        .replace(/--+/g, '-');   // remove multiple hyphens
};
