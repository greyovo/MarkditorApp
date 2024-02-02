// 设置当前窗口的名称，主要是打开文件后显示当前文件名
export function setWindowTitle(title: string) {
  if (title.trim() === "")
    document.title = "Markditor"
  else
    document.title = title + " - Markditor"
}

