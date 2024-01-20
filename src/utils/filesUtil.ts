export function getFileNameFromPath(path: string): string {
  let pathParts = path.split('\\');
  if (pathParts.length === 0) {
    pathParts = path.split("/")
  }
  return pathParts[pathParts.length - 1];
}

export function isMarkdownFile(fileName: string) {
  fileName = fileName.trim().toLowerCase();
  return fileName.endsWith(".md") || fileName.endsWith(".markdown");
}