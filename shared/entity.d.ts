// class FileEntity {
//   name: string
//   path: string
//   size: number
//   createDate: number // unix timestamp
//   lastModifiedDate: number // unix timestamp

//   constructor(name: string, path: string, size: number, createDate: number, lastModifiedDate: number) {
//     this.name = name
//     this.path = path
//     this.size = size
//     this.createDate = createDate
//     this.lastModifiedDate = lastModifiedDate
//   }
// }

interface DirectoryEntity {
  type: "file" | "dir"
  name: string
  path: string
  children: DirectoryEntity[]
  size?: number,
  createDate?: number // unix timestamp
  lastModifiedDate?: number // unix timestamp
}
