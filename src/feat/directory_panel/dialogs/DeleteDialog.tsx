import { deleteDirectory, deleteFile } from "@/store/directory";
import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, Flex, Kbd, Strong } from "@radix-ui/themes";
import { toast } from "sonner";
import { DialogProps } from "./DialogProps";

export function DeleteDialog({ show, entity, onOpenChange }: DialogProps) {
  async function confirm() {
    onOpenChange(false);
    let result = false
    if (entity.type === "dir") {
      result = await deleteDirectory(entity);
    } else {
      result = await deleteFile(entity);
    }
    if (result) {
      toast.success(`已删除: ${entity.name}`, {
        description: entity.path,
      })
    } else {
      toast.error(`删除失败: ${entity.name}`, {
        description: "文件可能正在被其他程序使用，无法删除"
      })
    }
  }

  return (
    <Dialog.Root open={show} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>确认删除</DialogTitle>
        <DialogDescription>
          要删除{entity.type === "dir" ? "文件夹" : "文件"}<Strong> {entity.name} </Strong>吗？删除后不可恢复。
        </DialogDescription>

        <Flex justify={"end"} gap={"2"}>
          <Button onClick={() => onOpenChange(false)}>取消</Button>
          <Button color="red" onClick={confirm}>删除</Button>
        </Flex>
      </DialogContent>
    </Dialog.Root>
  );
}
