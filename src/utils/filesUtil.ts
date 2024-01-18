export function getFileNameFromPath(path: string): string {
  const pathParts = path.split('/');
  return pathParts[pathParts.length - 1];
}