interface FileEntity {
  name: string,
  path: string,
  size: number,
  createDate: number, // unix timestamp
  lastModifiedDate: number, // unix timestamp
}

interface DirectoryEntity {
  name: string,
  path: string,
  children?: DirectoryEntity[] | FileEntity[],
  createDate: number, // unix timestamp
  lastModifiedDate: number, // unix timestamp
}

interface DocumentEntity {
  file: FileEntity
  content: string,
}
