import { createNewDoc, saveDocument } from "@/store/document";
import { Button, Dialog, Flex } from "@radix-ui/themes";

type UnsaveAlertDialogProps = {
  open: boolean,
  onOpenChange: (open: boolean) => void;
  doNext: () => void; // Go next after saving or not.
};

export function UnsaveAlertDialog({ open, onOpenChange, doNext }: UnsaveAlertDialogProps) {
  function cancel() {
    onOpenChange(false);
  }

  async function create(save: boolean) {
    if (save) {
      await saveDocument()
    }
    doNext()
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>文件未保存</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          在新建文件前保存当前文件的修改吗？
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={cancel}>
            点错了
          </Button>
          <Button variant="soft" color="red" onClick={() => create(false)}>
            不保存
          </Button>
          <Button onClick={() => create(true)}>保存</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}