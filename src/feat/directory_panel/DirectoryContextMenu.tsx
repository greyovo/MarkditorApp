import { useDialog } from "@/components/dialog/Dialog";
import { DialogContext } from "@/components/dialog/DialogContext";
import { createDirectory, createFile, deleteDirectory, deleteFile, openFile, renameDirectory, renameFile } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import { getParentDirectory } from "@/utils/path";
import { Button, Listbox, ListboxItem, ListboxSection, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import { error } from "console";
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

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [offset, setOffset] = useState({})

  return (
    <>
      <div onContextMenu={(e) => {
        e.preventDefault()
        setOffset({
          left: e.clientX + 2,
          top: e.clientY + 2
        })
        setIsPopoverOpen(true)
      }}>
        {children}
      </div>

      <div className="absolute" style={offset}>
        <Popover placement={"right-start"}
          onOpenChange={(open) => setIsPopoverOpen(open)} isOpen={isPopoverOpen}>
          <PopoverTrigger><div></div></PopoverTrigger>
          <PopoverContent className="p-1">
            <Listbox label="Right!" className="w-[150px] select-none" onAction={(k) => {
              console.log(k)
              setIsPopoverOpen(false)
            }}
              topContent={
                <div className="text-ellipsis line-clamp-1 break-all text-xs 
                px-2 py-1 text-default-400">{entity.name}</div>
              }
            >
              <ListboxSection showDivider>
                <ListboxItem key={"open"}>打开</ListboxItem>
                <ListboxItem key={"rename"}>重命名</ListboxItem>
                <ListboxItem key={"copy"}>创建副本</ListboxItem>
              </ListboxSection>
              <ListboxItem key={"newfile"}>新建文件</ListboxItem>
              <ListboxItem key={"newfolder"}>新建文件夹</ListboxItem>
              <ListboxItem color="danger" className="text-danger" key={"delete"}>删除</ListboxItem>
            </Listbox>
          </PopoverContent>
        </Popover>
      </div>

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