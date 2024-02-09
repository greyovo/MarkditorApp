import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { deleteDirectory, deleteFile } from "@/store/directory";
import { Button, DialogContent, DialogDescription, DialogTitle, Kbd } from "@radix-ui/themes";
import { toast } from "sonner";
import { DialogProps } from "./DialogProps";

export function DeleteDialog({ show, entity, onOpenChange }: DialogProps) {
  async function confirm() {
    onOpenChange(false);
    if (entity.type === "dir") {
      await deleteDirectory(entity);
    } else {
      await deleteFile(entity);
    }
    toast.success(`已删除: ${entity.name}`, {
      description: entity.path,
    })
  }

  return (
    <Dialog open={show} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>删除确认</DialogTitle>
          <DialogDescription>
            要删除{entity.type === "dir" ? "文件夹" : "文件"}<Kbd mx="1">{entity.name}</Kbd>吗？删除后不可恢复。
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button onClick={() => onOpenChange(false)}>取消</Button>
          <Button color="red" onClick={confirm}>删除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
