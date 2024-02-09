import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Button, DialogContent, DialogDescription, DialogTitle, TextField } from "@radix-ui/themes";
import { DialogProps } from "./DialogProps";
import { useState } from "react";

export function RenameDialog({ show, entity, onOpenChange }: DialogProps) {
  const [inputName, setInputName] = useState("");

  async function confirm() {
    // TODO RenameDialog
    onOpenChange(false);

    // clear state
    setInputName("");
  }

  return (
    <Dialog open={show} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogHeader className="mb-2">
          <DialogTitle>重命名</DialogTitle>
          <DialogDescription>
            输入新的{entity.type === "dir" ? "文件夹" : "文件"}名：
            <TextField.Input my="2" value={inputName} placeholder={entity.name}
              onInput={(e) => setInputName(e.currentTarget.value)}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button variant="soft" onClick={() => onOpenChange(false)}>取消</Button>
          <Button onClick={confirm} disabled={inputName.trim().length === 0}>确定</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
