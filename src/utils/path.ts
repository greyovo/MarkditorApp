import { URI, Utils } from "vscode-uri";
import { EnvConstants } from "./constants";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export function getNameFromPath(path: string, withExtName: boolean = true): string {
  let pathParts = path.split('\\');
  if (pathParts.length === 0) {
    pathParts = path.split("/")
  }
  const fileName = pathParts[pathParts.length - 1];
  if (withExtName) {
    return fileName;
  } else {
    return fileName.substring(0, fileName.lastIndexOf("."));
  }
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
    let src = img.getAttribute("src") ?? ""
    console.log("raw:", src);

    if (src.startsWith("http://") || src.startsWith("https://")) {
      if (src.startsWith("http://localhost")) {
        // remove `localhost:port`
        src = src.replace(/^https?:\/\/localhost:\d+\/?/, "")
      } else {
        continue
      }
    }

    if (!isFullPath(src)) {
      src = resolveFromRelativePath(src, baseDir)
    }

    if (EnvConstants.isTauri) {
      const decodedSrc = decodeURI(src).replace("file:///", "")
      img.src = convertFileSrc(decodedSrc)
    } else {
      img.src = img.src.replace(img.baseURI, baseDir + "/")
    }
    console.log(img.src);

  }
  return el.innerHTML
}

function isFullPath(path: string): boolean {
  return path.search(/^[a-zA-Z]:[\\|\/]/) !== -1
}

// Full Path -> Relative Path
export function convertToRelativePath(fullPath: string, baseDir: string) {
  const rel = fullPath.replace(baseDir, "")
  if (rel.startsWith("\\") || rel.startsWith("/")) {
    return rel.substring(1)
  }
  return rel
}

// Relative Path -> Full path
export function resolveFromRelativePath(relativePath: string, baseDir: string) {
  console.log("relativePath", relativePath);
  relativePath = decodeURI(relativePath.replaceAll("\\", "/"))
  baseDir = baseDir.replaceAll("\\", "/")
  if (relativePath.replace("file:///", "").startsWith(baseDir)) {
    return relativePath
  }
  return Utils.resolvePath(URI.parse(`${baseDir}`), relativePath).toString()
}

export function resolveWhitespaceInPath(path: string): string {
  return path.replaceAll(" ", "%20")
}

export function fixMdFileName(fileName: string): string {
  if (!isMarkdownFile(fileName)) {
    fileName += ".md"
  }
  return fileName
}

export function validateDirectoryName(dirName: string): boolean {
  return (dirName.trim().match(/[\\/:*?"<>|]/g)?.length ?? 0) === 0
}