import fs from 'node:fs';
import path from 'node:path';

/**
 * Deletes a file from /src/public directory if it exists
 */
export const deleteFile = async (
  directory: string,
  fileName: string
): Promise<void> => {
  const filePath = path.join(
    process.cwd(),
    'src',
    'public',
    directory,
    fileName
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
