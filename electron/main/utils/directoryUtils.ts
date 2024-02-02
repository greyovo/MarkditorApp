import fs from 'fs';
import { join } from 'path';

export async function getChildrenDirectories(path: string): Promise<DirectoryEntity[]> {
  return new Promise((resolve, reject) => {
    try {
      const childrenName: string[] = fs.readdirSync(path); // 同步方法调用
      const files: DirectoryEntity[] = []
      const dir: DirectoryEntity[] = []

      childrenName.map((child: string) => {
        const stat: fs.Stats = fs.statSync(`${path}/${child}`)
        const item: DirectoryEntity = {
          type: stat.isDirectory() ? 'dir' : 'file',
          name: child,
          path: join(path, child),
          children: [],
          createDate: stat.birthtimeMs,
          lastModifiedDate: stat.mtimeMs
        }
        if (stat.isDirectory()) {
          dir.push(item)
        } else {
          files.push(item)
        }
      })
      const result = [...dir, ...files]
      resolve(result);
    } catch (error) {
      reject(error);
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