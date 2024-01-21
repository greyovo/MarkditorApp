import Vditor from "vditor";

export function toggleRangeBold(vditor: Vditor, enabled: boolean) {
  const selected = vditor.getSelection().trim()
  if (enabled) {
    vditor.updateValue(selected.slice(2, -2))
  } else {
    vditor.updateValue(`**${selected}**`)
  }
}

export function toggleRangeItalic(vditor: Vditor, enabled: boolean) {
  const selected = vditor.getSelection().trim()
  if (enabled) {
    vditor.updateValue(selected.slice(1, -1))
  } else {
    vditor.updateValue(`*${selected}*`)
  }
}

export function toggleRangeDeleteline(vditor: Vditor, enabled: boolean) {
  const selected = vditor.getSelection().trim()
  if (enabled) {
    vditor.updateValue(selected.replace("<u>", "").replace("</u>", ""))
  } else {
    vditor.updateValue(`<u>${selected}</u>`)
  }
}

export async function getMarkdownExample() {
  const resp = await fetch("./example.md")
  return resp.text()
}