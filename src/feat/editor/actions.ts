import Vditor from "vditor";
import { getVditor } from "./Editor";

export function toggleRangeBold(status: boolean, vditor: Vditor = getVditor()!,) {
  const selected = vditor.getSelection().trim()
  if (status) {
    vditor.updateValue(selected.slice(2, -2))
  } else {
    vditor.updateValue(`**${selected}**`)
  }
}

export function toggleRangeItalic(status: boolean, vditor: Vditor = getVditor()!,) {
  const selected = vditor.getSelection().trim()
  if (status) {
    vditor.updateValue(selected.slice(1, -1))
  } else {
    vditor.updateValue(`*${selected}*`)
  }
}

export function toggleRangeUnderline(status: boolean, vditor: Vditor = getVditor()!,) {
  const selected = vditor.getSelection().trim()
  if (status) {
    vditor.updateValue(selected.replace("<u>", "").replace("</u>", ""))
  } else {
    vditor.updateValue(`<u>${selected}</u>`)
  }
}

export function toggleRangeStrikeline(status: boolean, vditor: Vditor = getVditor()!,) {
  const selected = vditor.getSelection().trim()
  if (status) {
    vditor.updateValue(selected.slice(2, -2))
  } else {
    vditor.updateValue(`~~${selected}~~`)
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
}

export function toggleSourceMode() {
  getVditor()?.setPreviewMode("both")
}