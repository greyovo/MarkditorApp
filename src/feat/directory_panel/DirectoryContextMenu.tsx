import { useDialog } from "@/components/dialog/Dialog";
import { DialogContext } from "@/components/dialog/DialogContext";
import { createDirectory, createFile, deleteDirectory, deleteFile, openFile, renameDirectory, renameFile } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import { getParentDirectory } from "@/utils/path";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { ContextMenu, Dialog, TextField, TextFieldInput } from "@radix-ui/themes";
import { error } from "console";
import { useState } from "react";
import { toast } from "sonner";

export function DirectoryContextMenu({ children, entity, onRename }: { children: React.ReactNode, entity: DirectoryEntity, onRename: () => void }) {
  const { openDialog } = useDialog();

  const [newFileName, setNewFileName] = useState("")

  function handleDelete() {
    openDialog({
      title: `删除: ${entity.name}`,
      content: "确定？",
      danger: true,
      confirmText: "删除",
      denyText: "取消",
      onConfirm: () => {
        if (entity.type === 'file') {
          deleteFile(entity)
        } else {
          deleteDirectory(entity)
        }
      }
    })
  }

  async function handleCreateNewFile() {
    const date = new Date()
    try {
      const parent = entity.type === 'dir' ? entity : getParentDirectory(entity.path)
      await createFile(parent, newFileName)
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

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          {children}
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item onClick={() => openFile(entity.path)}>打开</ContextMenu.Item>
          <ContextMenu.Item onClick={onRename}>重命名</ContextMenu.Item>
          <ContextMenu.Item >创建副本</ContextMenu.Item>
          <ContextMenu.Separator />

          {/* 新建文件和对话框 */}

          <ContextMenu.Item onClick={onOpen}>
            新建文件
          </ContextMenu.Item>

          <ContextMenu.Item onClick={handleCreateNewFolder} >新建文件夹</ContextMenu.Item>

          {/* <ContextMenu.Sub>
          <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Move to project…</ContextMenu.Item>
            <ContextMenu.Item>Move to folder…</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Advanced options…</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub> */}

          {/* <ContextMenu.Item>Share</ContextMenu.Item>
        <ContextMenu.Item>Add to favorites</ContextMenu.Item> */}
          <ContextMenu.Separator />
          <ContextMenu.Item color="red" onClick={handleDelete}>删除</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

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