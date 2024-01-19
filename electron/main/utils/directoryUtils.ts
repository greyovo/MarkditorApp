import fs from 'fs';
import { join } from 'path';

export async function getChildrenDirectories(path: string): Promise<(DirectoryEntity | FileEntity)[]> {
  return new Promise((resolve, reject) => {
    try {
      const childrenName: string[] = fs.readdirSync(path); // 同步方法调用
      const files: FileEntity[] = []
      const dir: DirectoryEntity[] = []

      childrenName.map((child: string) => {
        const item: fs.Stats = fs.statSync(`${path}/${child}`)
        if (item.isDirectory()) {
          dir.push({
            name: child,
            path: join(path, child),
            createDate: item.birthtimeMs,
            lastModifiedDate: item.mtimeMs
          })
        } else {
          files.push({
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
