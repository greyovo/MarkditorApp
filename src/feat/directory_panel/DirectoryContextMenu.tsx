import useDirectoryStore, { openFile } from "@/store/directory";
import { ContextMenu } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { CreateDialog } from "./dialogs/CreateDialog";
import { RenameDialog } from "./dialogs/RenameDialog";
import { DeleteDialog } from "./dialogs/DeleteDialog";

type DirectoryMenuItemsProps = {
  entity: DirectoryEntity;
  onRename: () => void;
  onDelete: () => void;
  onCopy: () => void;
}

function DirectoryMenuItems({ entity, onRename, onCopy, onDelete }: DirectoryMenuItemsProps) {
  return (
    <>
      <ContextMenu.Item onClick={() => openFile(entity.path)}>打开</ContextMenu.Item>
      <ContextMenu.Item onClick={onRename}>重命名</ContextMenu.Item>
      <ContextMenu.Item onClick={onCopy}>创建副本</ContextMenu.Item>
      <ContextMenu.Item color="red" onClick={onDelete}>删除</ContextMenu.Item>
    </>
  )
}

export function DirectoryContextMenu({ children, entity }: { children: React.ReactNode, entity: DirectoryEntity }) {
  const rootDir = useDirectoryStore((state) => state.root)
  const isRoot = entity.path === rootDir?.path

  const [showDelete, setShowDelete] = useState(false)
  const [showRename, setShowRename] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [newItemType, setNewItemType] = useState<"dir" | "file">("dir")

  function handleCreateFile() {
    setNewItemType("file")
    setShowCreate(true)
  }

  function handleCreateDirectory() {
    setNewItemType("dir")
    setShowCreate(true)
  }

  function handleCopy() {
    // TODO copy logic
  }

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
        <ContextMenu.Content className="w-[11rem] max-w-[15rem]">
          <div className="line-clamp-1 text-xs text-ellipsis break-all py-1.5 px-3 mb-1 opacity-40 h-6">
            {entity.name}
          </div>
          {
            !isRoot &&
            <DirectoryMenuItems
              entity={entity}
              onRename={() => setShowRename(true)}
              onDelete={() => setShowDelete(true)}
              onCopy={handleCopy}
            />
          }

          <ContextMenu.Separator />

          <ContextMenu.Item onClick={handleCreateFile}>新建文件</ContextMenu.Item>
          <ContextMenu.Item onClick={handleCreateDirectory}>新建文件夹</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>


      <DeleteDialog show={showDelete} entity={entity} onOpenChange={setShowDelete} />
      <RenameDialog show={showRename} key={entity.path} entity={entity} onOpenChange={setShowRename} />
      <CreateDialog show={showCreate}
        newItemType={newItemType}
        entity={entity} onOpenChange={setShowCreate}
      />
    </>
  )
}