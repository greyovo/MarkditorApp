export function getFileNameFromPath(path: string): string {
  let pathParts = path.split('\\');
  if (pathParts.length === 0) {
    pathParts = path.split("/")
  }
  return pathParts[pathParts.length - 1];
}

export function getParentDirectory(path: string): DirectoryEntity {
  let pathParts = path.split('\\');
  if (pathParts.length === 0) {
    pathParts = path.split("/")
  }
  pathParts.pop();
  
  return {
    type: "dir",
    name: pathParts[pathParts.length - 1],
    path: pathParts.join('\\'),
    children: []
  }
}

export function getFileNameWithoutExtension(fileName: string): string {
  return fileName.substring(0, fileName.lastIndexOf("."));
}

export function isMarkdownFile(fileName: string) {
  fileName = fileName.trim().toLowerCase();
  return fileName.endsWith(".md") || fileName.endsWith(".markdown");
}