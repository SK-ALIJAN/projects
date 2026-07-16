export function cn(...classes: (string | undefined | null | boolean | Record<string, boolean | undefined | null>)[]) {
  const result: string[] = [];

  for (const value of classes) {
    if (!value) continue;

    if (typeof value === 'string') {
      result.push(value);
    } else if (typeof value === 'object') {
      for (const key in value) {
        if (value[key]) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ').replace(/\s+/g, ' ').trim();
}
