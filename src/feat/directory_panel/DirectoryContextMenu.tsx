// import { ContextMenu } from "@/components/context_menu";
import { useDialog } from "@/components/dialog/Dialog";
import { DialogContext } from "@/components/dialog/DialogContext";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuPortal, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu";
import { createDirectory, createFile, deleteDirectory, deleteFile, openFile, renameDirectory, renameFile } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import { getParentDirectory } from "@/utils/path";
import { Button, Listbox, ListboxItem, ListboxSection, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import { ChevronRightIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";


export const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export function DirectoryContextMenu({ children, entity, onRename }: { children: React.ReactNode, entity: DirectoryEntity, onRename: () => void }) {
  const { openDialog } = useDialog();

  const [newFileName, setNewFileName] = useState("")

  function handleDelete() {
    onOpen()
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

  async function handleCreateNewFile() {
    const date = new Date()
    try {
      const parent = entity.type === 'dir' ? entity : getParentDirectory(entity.path)
      await createFile(parent, newFileName + date.getTime() + ".md")
    } catch (err) {
      console.error("Failed to create new file.", err);
      toast.error("创建文件失败");
    }
  }

  async function handleCreateNewFolder() {
    try {
      const parent = entity.type === 'dir' ? entity : getParentDirectory(entity.path)
      await createDirectory(parent, "NewFolder")
    } catch (err) {
      console.error("Failed to create new folder.", err);
      toast.error("创建文件失败");
    }
  }

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubOpen, setIsSubOpen] = useState(false);

  const topContent = <div className="text-ellipsis line-clamp-1 break-all text-xs
  px-2 text-default-400">{entity.name}</div>

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-[200px] select-none">
          <div className="line-clamp-1 text-xs pl-1.5 text-default-400 py-1 break-all text-ellipsis">{entity.name}</div>
          <ContextMenuSeparator />
          <ContextMenuItem>重命名
            <ContextMenuShortcut>⌘+R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>创建副本</ContextMenuItem>
          <ContextMenuItem>在文件管理器打开
            <ContextMenuShortcut>⌘+E</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuSeparator />
          <ContextMenuItem>新建文件</ContextMenuItem>
          <ContextMenuItem>新建文件夹</ContextMenuItem>
          {/* <ContextMenuSub>
            <ContextMenuSubTrigger>移动到...</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Desktop</ContextMenuItem>
              <ContextMenuItem>Documents</ContextMenuItem>
              <ContextMenuItem>Downloads</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub> */}
          <ContextMenuSeparator />
          <ContextMenuItem className="text-danger focus:bg-danger-50 focus:text-danger">
            删除
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* <ContextMenu trigger={children} topContent={topContent}>
        <ListboxSection showDivider>
          <ListboxItem key={"rename"}>重命名</ListboxItem>
          <ListboxItem key={"copy"}>创建副本</ListboxItem>
        </ListboxSection>
        <ListboxItem key={"newfile"} onClick={handleCreateNewFile}>新建文件</ListboxItem>
        <ListboxItem key={"newfolder"} onClick={handleCreateNewFolder}>新建文件夹</ListboxItem>
        <ListboxItem
          color="danger" className="text-danger" key={"delete"} onClick={handleDelete}>
          删除
        </ListboxItem>
      </ContextMenu> */}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
            <ModalBody>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam pulvinar risus non risus hendrerit venenatis.
                Pellentesque sit amet hendrerit risus, sed porttitor quam.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
              <Button variant="light" color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}