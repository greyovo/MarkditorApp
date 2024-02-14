import { closeCurrentDoc, createNewDoc, saveDocument } from "@/store/document"
import { toast } from "sonner"

export async function handleEditorHotKey(e: KeyboardEvent) {
  const key = e.key.toLowerCase()

  if (e.ctrlKey || e.metaKey) {
    switch (key) {
      case 's': // Ctrl+S
        try {
          const res = await saveDocument()
          if (res) toast.success("保存成功", { id: "save-success", duration: 3000 })
        } catch (error) {
          toast.error("保存失败", { description: `${error}`, duration: 10000 })
          console.error(error);
        }
        break
      case 'n': // Ctrl+N
        createNewDoc()
        break
      case 'w':
      case 'q': // Ctrl+W or Ctrl+Q
        await closeCurrentDoc()
        break
      default:
        return
    }
  }
}