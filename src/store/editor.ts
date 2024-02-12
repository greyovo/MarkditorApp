import Vditor from 'vditor'
import { create } from 'zustand'

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

// -----------------------------------------

export const setVditor = (instance?: Vditor) => setState({ instance })

export function getVditor(): Vditor | undefined {
  return getState().instance
}

export function getEditorSelection(): string {
  return getVditor()?.getSelection()?.trim() ?? ""
}

export function toggleRangeBold(status: boolean) {
  const selected = getEditorSelection()
  console.log(selected, status);

  if (status) {
    getVditor()?.updateValue(`**${selected}**`)
  } else {
    // FIXME 此处获取到的选中文字不包括前后的*号
    // 因为在点击其他地方后，再次获取选中时，文字编辑器在失去焦点时会自动隐藏了前后的*号，下同
    getVditor()?.updateValue(selected.slice(2, -2))
  }
}

export function toggleRangeItalic(status: boolean) {
  const selected = getEditorSelection()
  if (status) {
    getVditor()?.updateValue(`*${selected}*`)
  } else {
    getVditor()?.updateValue(selected.slice(1, -1))
  }
}

export function toggleRangeUnderline(status: boolean) {
  const selected = getEditorSelection()
  if (status) {
    getVditor()?.updateValue(`<u>${selected}</u>`)
  } else {
    getVditor()?.updateValue(selected.replace("<u>", "").replace("</u>", ""))
  }
}

export function toggleRangeStrikeline(status: boolean) {
  const selected = getEditorSelection()
  if (status) {
    getVditor()?.updateValue(`~~${selected}~~`)
  } else {
    getVditor()?.updateValue(selected.slice(2, -2))
  }
}

export async function getMarkdownExample() {
  const resp = await fetch("./example.md")
  return resp.text()
}

export function undo() {
  getVditor()?.undo()
}

export function redo() {
  getVditor()?.redo()
}

export function toggleOutline() {
  getVditor()?.toggleOutline()
}

export function toggleToolbar() {
  getVditor()?.toggleToolbar()
  setState((state) => ({ ...state, toolbarVisible: getVditor()?.getToolbarVisible() }))
}

export function toggleSourceMode() {
  getVditor()?.setPreviewMode("both")
}

export default useEditorStore