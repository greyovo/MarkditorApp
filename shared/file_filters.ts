export interface IFileFilter {
  name: string,
  extensions: string[]
}

export const markdownFilter: IFileFilter = {
  name: 'Markdown Document 文件',
  extensions: ['md', 'markdown']
}


export const imagesFilter: IFileFilter = {
  name: 'Images 图片文件',
  extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'svg']
}