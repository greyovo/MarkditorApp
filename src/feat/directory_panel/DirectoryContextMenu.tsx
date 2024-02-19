import useDirectoryStore, { copyFileInPlace, openFile, refreshRootDir } from "@/store/directory";
import { ContextMenu } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { CreateDialog } from "./dialogs/CreateDialog";
import { RenameDialog } from "./dialogs/RenameDialog";
import { DeleteDialog } from "./dialogs/DeleteDialog";
import { PlatformAPI } from "@/ipc";
import { getNameFromPath, getParentDirectory, resolveFromRelativePath } from "@/utils/path";
import { toast } from "sonner";

type NonRootDirectoryMenuItemsProps = {
  entity: DirectoryEntity;
  onRename: () => void;
  onDelete: () => void;
}

function openInSystem(entity: DirectoryEntity) {
  if (entity.type === 'file')
    PlatformAPI.locateFile(entity.path);
  else
    PlatformAPI.locateFolder(entity.path);
}

function NonRootDirectoryMenuItems({ entity, onRename, onDelete }: NonRootDirectoryMenuItemsProps) {
  async function handleCopy() {
    if (entity.type === 'file') {
      const destPath = await copyFileInPlace(entity.path)
      if (destPath) {
        toast.success("复制成功", { description: destPath });
      } else {
        toast.error("复制失败");
      }
    }
  }

  return (
    <>
      <ContextMenu.Item onClick={() => openFile(entity.path)}>打开</ContextMenu.Item>
      <ContextMenu.Item onClick={onRename}>重命名</ContextMenu.Item>
      {entity.type === 'file' && <ContextMenu.Item onClick={handleCopy}>创建副本</ContextMenu.Item>}
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

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
        <ContextMenu.Content onContextMenu={(e) => e.stopPropagation()}
          className="w-[11rem] max-w-[15rem]">
          <div className="line-clamp-1 text-xs text-ellipsis break-all py-1.5 px-3 mb-1 opacity-40 h-6">
            {entity.name}
          </div>
          {
            !isRoot &&
            <NonRootDirectoryMenuItems
              entity={entity}
              onRename={() => setShowRename(true)}
              onDelete={() => setShowDelete(true)}
            />
          }
          <ContextMenu.Separator />

          <ContextMenu.Item onClick={handleCreateFile}>新建文件</ContextMenu.Item>
          <ContextMenu.Item onClick={handleCreateDirectory}>新建文件夹</ContextMenu.Item>

          <ContextMenu.Separator />

          <ContextMenu.Item onClick={() => openInSystem(entity)}>在文件管理器显示...</ContextMenu.Item>
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