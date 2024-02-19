import Vditor from 'vditor'
import { create } from 'zustand'
import usePreferenceStore from './preference'
import { PlatformAPI } from '@/ipc'
import { openFile, setRootDir } from './directory'
import { convertToRelativePath, getNameFromPath, getParentDirectory, resolveWhitespaceInPath } from '@/utils/path'
import { imagesFilter } from '@shared/file_filters'
import useDocumentStore from './document'

interface EditorState {
  instance?: Vditor
  toolbarVisible: boolean
}

const useEditorStore = create<EditorState>(
  () => ({
    instance: undefined,
    toolbarVisible: false
  })
)

const { setState, getState, subscribe } = useEditorStore

export function getVditor(): Vditor | undefined {
  return getState().instance
}

// -----------------------------------------

export class EditorActions {

  public async initVditor(instance?: Vditor) {
    setState({ instance })
    const themeMode = usePreferenceStore.getState().themeMode()
    if (themeMode === "light") {
      instance?.setTheme("classic", "light", "github")
    } else {
      instance?.setTheme("dark", "dark", "native")
    }
  }

  public syncTheme = () => {
    const themeMode = usePreferenceStore.getState().themeMode()
    if (themeMode === "light") {
      getVditor()?.setTheme("classic", "light", "github")
    } else {
      getVditor()?.setTheme("dark", "dark", "native")
    }
  }

  public getEditorSelection = (): string => {
    return getState().instance?.getSelection() ?? ""
  }

  public toggleRangeBold = (status: boolean) => {
    const selected = this.getEditorSelection()

    if (status) {
      getVditor()?.updateValue(`**${selected}**`)
    } else {
      // FIXME 此处获取到的选中文字不包括前后的*号
      // 因为在点击其他地方后，再次获取选中时，文字编辑器在失去焦点时会自动隐藏了前后的*号，下同
      getVditor()?.updateValue(selected.slice(2, -2))
    }
  }

  public toggleRangeItalic = (status: boolean) => {
    const selected = this.getEditorSelection()
    if (status) {
      getVditor()?.updateValue(`*${selected}*`)
    } else {
      getVditor()?.updateValue(selected.slice(1, -1))
    }
  }

  public toggleRangeUnderline = (status: boolean) => {
    const selected = this.getEditorSelection()
    if (status) {
      getVditor()?.updateValue(`<u>${selected}</u>`)
    } else {
      getVditor()?.updateValue(selected.replace("<u>", "").replace("</u>", ""))
    }
  }

  public toggleRangeStrikeline = (status: boolean) => {
    const selected = this.getEditorSelection()
    if (status) {
      getVditor()?.updateValue(`~~${selected}~~`)
    } else {
      getVditor()?.updateValue(selected.slice(2, -2))
    }
  }

  public getMarkdownExample = async () => {
    const resp = await fetch("./example.md")
    return resp.text()
  }

  public undo = () => {
    getVditor()?.undo()
  }

  public redo = () => {
    getVditor()?.redo()
  }

  public toggleOutline = () => {
    getVditor()?.toggleOutline()
  }

  public toggleToolbar = () => {
    getVditor()?.toggleToolbar()
    setState((state) => ({ ...state, toolbarVisible: getVditor()?.getToolbarVisible() }))
  }

  public toggleSourceMode = () => {
    getVditor()?.setPreviewMode("both")
  }

  public pasteContent = async () => {
    try {
      const clipboardContents = await navigator.clipboard.read();
      for (const item of clipboardContents) {
        for (const mimeType of item.types) {
          if (mimeType === "image/png") {
            console.log("粘贴图片");
            // const blob = await item.getType("image/png");
            // pngImage.src = URL.createObjectURL(blob);
          } else if (mimeType === "text/html") {
            console.log("粘贴html")
            const blob = await item.getType("text/html");
            const blobText = await blob.text();
          } else if (mimeType === "text/plain") {
            console.log("粘贴文本")
            const blob = await item.getType("text/plain");
            const blobText = await blob.text();
            getVditor()?.insertValue(blobText)
          } else {
            throw new Error(`${mimeType} not supported.`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  public copyContent = async () => {
    const selected = this.getEditorSelection()
    if (selected.length > 0) {
      await navigator.clipboard.writeText(selected)
    }
  }

  public cutContent = async () => {
    await this.copyContent()
    getVditor()?.deleteValue()
  }

  public insertParagraph = async (position: "up" | "down") => {
    // TODO 在上方或在下方插入段落
  }

  public async insertImage() {
    // TODO 插入图片
    const imgDirEntity = (await PlatformAPI.selectFile(imagesFilter))
    if (!imgDirEntity) return
    const imgPath = resolveWhitespaceInPath(imgDirEntity.path)
    const baseDir = useDocumentStore.getState().baseDir
    if (imgPath) {
      let imgSrc = imgPath
      // 转为相对路径
      if (baseDir) {
        imgSrc = convertToRelativePath(imgPath, baseDir)
      }
      // const imgSrc = convertRelativePath(imgPath.path, baseDir)
      getVditor()?.insertValue(`![${getNameFromPath(imgDirEntity.name, false)}](${imgSrc})`)
    }
  }

  public async insertTable() {
    // TODO 插入表格
  }
}

export const editorAction = new EditorActions()

export default useEditorStore