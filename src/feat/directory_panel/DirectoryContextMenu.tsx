import { useDialog } from "@/components/dialog/Dialog";
import { DialogContext } from "@/components/dialog/DialogContext";
import { deleteDirectory, deleteFile, openFile, renameDirectory, renameFile } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import { ContextMenu } from "@radix-ui/themes";

export function DirectoryContextMenu({ children, entity, onRename }: { children: React.ReactNode, entity: DirectoryEntity, onRename: () => void }) {
  const { openDialog } = useDialog();

  function handleDelete() {
    openDialog({
      title: `删除: ${entity.name}`,
      content: "确定？",
      onConfirm: () => {
        if (entity.type === 'file') {
          deleteFile(entity)
        } else {
          deleteDirectory(entity)
        }
      }
    })
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item onClick={() => openFile(entity.path)}>打开</ContextMenu.Item>
        <ContextMenu.Item onClick={onRename}>重命名</ContextMenu.Item>
        <ContextMenu.Item shortcut="⌘ D">创建副本</ContextMenu.Item>
        <ContextMenu.Separator />
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

        {/* <ContextMenu.Item>Share</ContextMenu.Item>
        <ContextMenu.Item>Add to favorites</ContextMenu.Item> */}
        <ContextMenu.Separator />
        <ContextMenu.Item color="red" onClick={handleDelete}>删除</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}