import useDocumentStore from "@/store/document";

export function getNameFromPath(path: string): string {
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

// 对img转换显示路径
export function convertImagePath(html: string, baseDir: string): string {
  const el = document.createElement("div")
  el.innerHTML = html
  const imgs = el.getElementsByTagName("img")
  for (const img of imgs) {
    img.src = img.src.replace(img.baseURI, baseDir + "/")
  }
  return el.innerHTML
}