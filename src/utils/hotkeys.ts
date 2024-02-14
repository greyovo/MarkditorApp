import { closeCurrentDoc, createNewDoc, saveDocument } from "@/store/document"
import { toast } from "sonner"

export async function handleEditorHotKey(e: KeyboardEvent) {
  const key = e.key.toLocaleLowerCase()

  if (key === "s" && (e.ctrlKey || e.metaKey)) {
    try {
      await saveDocument()
      toast.success("保存成功", { id: "save-success", dismissible: false})
    } catch (error) {
      toast.error("保存失败", { description: `${error}` })
      console.error(error);
    }
  }
  if (key === "w" && (e.ctrlKey || e.metaKey)) {
    closeCurrentDoc()
  }
  if (key === "n" && (e.ctrlKey || e.metaKey)) {
    createNewDoc()
  }
}