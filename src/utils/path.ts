import useDocumentStore from "@/store/document";
import { Constants } from "./constants";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export function getNameFromPath(path: string): string {
  let pathParts = path.split('\\');
  if (pathParts.length === 0) {
    pathParts = path.split("/")
  }
  return pathParts[pathParts.length - 1];
}

export function getDirectoryFromPath(path: string): DirectoryEntity {
  return {
    type: "dir",
    name: getNameFromPath(path),
    path: path,
    children: []
  }
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


export function findTargetDirRecursive
  (children: DirectoryEntity[], targetPath: string): DirectoryEntity | undefined {
  if (!children || children.length === 0) {
    return undefined
  }
  for (const dir of children) {
    if (dir.path === targetPath) {
      return dir
    }
    const targetDir = findTargetDirRecursive(dir.children, targetPath)
    if (targetDir) {
      return targetDir
    }
  }
  return undefined
}

// 对img转换显示路径
export function convertImagePath(html: string, baseDir: string): string {
  const el = document.createElement("div")
  el.innerHTML = html
  const imgs = el.getElementsByTagName("img")
  for (const img of imgs) {
    if (Constants.isTauri) {
      img.src = convertFileSrc(img.src.replace(img.baseURI, baseDir + "/"))
    } else {
      img.src = img.src.replace(img.baseURI, baseDir + "/")
    }
  }
  return el.innerHTML
}