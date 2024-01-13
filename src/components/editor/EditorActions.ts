import Vditor from "vditor";

export function toggleRangeBold(vditor: Vditor, enabled: boolean) {
  const selected = vditor.getSelection().trim()
  if (enabled) {
    vditor.deleteValue()
    vditor.insertValue(selected.slice(2, -2))
  } else {
    vditor.deleteValue()
    vditor.insertValue(`**${selected}**`)
  }
}

export function toggleRangeItalic(vditor: Vditor, enabled: boolean) {
  const selected = vditor.getSelection().trim()
  if (enabled) {
    vditor.deleteValue()
    vditor.insertValue(selected.slice(1, -1))
  } else {
    vditor.deleteValue()
    vditor.insertValue(`*${selected}*`)
  }
}

export function toggleRangeDeleteline(vditor: Vditor, enabled: boolean) {
  const selected = vditor.getSelection().trim()
  if (enabled) {
    vditor.deleteValue()
    vditor.insertValue(selected.replace("<u>", "").replace("</u>", ""))
  } else {
    vditor.deleteValue()
    vditor.insertValue(`<u>${selected}</u>`)
  }
}