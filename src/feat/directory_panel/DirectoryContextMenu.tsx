import { useDialog } from "@/components/dialog/Dialog";
import { DialogContext } from "@/components/dialog/DialogContext";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import useDirectoryStore, { deleteDirectory, deleteFile, openFile, renameDirectory, renameFile } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import { Button, ContextMenu, DialogContent, DialogDescription, DialogTitle, DialogTrigger, TextField, TextFieldInput } from "@radix-ui/themes";
import { useState } from "react";

export function DirectoryContextMenu({ children, entity }: { children: React.ReactNode, entity: DirectoryEntity }) {
  const { openDialog } = useDialog();

  const rootDir = useDirectoryStore((state) => state.root)
  const isRoot = entity.path === rootDir?.path

  function handleDelete() {
    setOpen(true)
    // openDialog({
    //   title: `删除: ${entity.name}`,
    //   content: "确定？",
    //   danger: true,
    //   confirmText: "删除",
    //   denyText: "取消",
    //   onConfirm: () => {
    //     if (entity.type === 'file') {
    //       deleteFile(entity)
    //     } else {
    //       deleteDirectory(entity)
    //     }
    //   }
    // })
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          {children}
        </ContextMenu.Trigger>
        <ContextMenu.Content className="max-w-[15rem]">
          <div className="line-clamp-1 text-xs text-ellipsis break-all py-1.5 px-3 mb-1 opacity-40 h-6">
            {entity.name}
          </div>
          {!isRoot && <ContextMenu.Item onClick={() => openFile(entity.path)}>打开</ContextMenu.Item>}
          {!isRoot && <ContextMenu.Item>重命名</ContextMenu.Item>}
          {!isRoot && <ContextMenu.Item shortcut="⌘ D">创建副本</ContextMenu.Item>}
          {!isRoot && <ContextMenu.Separator />}

          <ContextMenu.Item onClick={() => createNewDoc()}>新建文件</ContextMenu.Item>
          <ContextMenu.Item shortcut="⌘ N">新建文件夹</ContextMenu.Item>

          {/* <ContextMenu.Sub>
          <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Move to project…</ContextMenu.Item>
            <ContextMenu.Item>Move to folder…</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Advanced options…</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub> */}
          
          {!isRoot && <ContextMenu.Separator />}
          {!isRoot && <ContextMenu.Item color="red" onClick={handleDelete}>删除</ContextMenu.Item>}

        </ContextMenu.Content>
      </ContextMenu.Root>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader className="mb-2">
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <TextField.Input placeholder="Enter your email" />
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button color="red" onClick={() => setOpen(false)}>删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )
}