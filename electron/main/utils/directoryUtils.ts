import fs from 'fs';
import { join } from 'path';

export async function getChildrenDirectories(path: string): Promise<DirectoryEntity[]> {
  return new Promise((resolve, reject) => {
    try {
      const childrenName: string[] = fs.readdirSync(path); // 同步方法调用
      const files: DirectoryEntity[] = []
      const dir: DirectoryEntity[] = []

      childrenName.map((child: string) => {
        const item: fs.Stats = fs.statSync(`${path}/${child}`)
        if (item.isDirectory()) {
          dir.push({
            type: 'dir',
            name: child,
            path: join(path, child),
            createDate: item.birthtimeMs,
            lastModifiedDate: item.mtimeMs
          })
        } else {
          files.push({
            type: "file",
            name: child,
            path: join(path, child),
            createDate: item.birthtimeMs,
            lastModifiedDate: item.mtimeMs,
            size: item.size
          })
        }
      })
      const result = [...dir, ...files]
      resolve(result); // 成功时解析 Promise
    } catch (error) {
      reject(error); // 失败时拒绝 Promise
    }
  });
}

export function getFileNameFromPath(path: string): string {
  let pathParts = path.split('\\');
  if (pathParts.length === 0) {
    pathParts = path.split("/")
  }
  return pathParts[pathParts.length - 1];
}