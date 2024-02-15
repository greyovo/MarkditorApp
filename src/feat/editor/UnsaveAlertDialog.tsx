import useDialogStore, { dialogActions } from "@/store/dialog";
import { saveDocument } from "@/store/document";
import { Button, Dialog, Flex } from "@radix-ui/themes";

export function UnsaveAlertDialog() {
  const visible = useDialogStore((state) => state.unsaveAlert.visible);
  const doNext = useDialogStore((state) => state.unsaveAlert.doNext);

  function cancel() {
    dialogActions.hideUnsaveAlert();
  }

  async function handleDoNext(save: boolean) {
    if (save) {
      await saveDocument()
    }
    doNext?.()
    dialogActions.hideUnsaveAlert();
  }

  return (
    <Dialog.Root open={visible} onOpenChange={dialogActions.hideUnsaveAlert}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>文件未保存</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          在继续操作前保存当前文件的修改吗？
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Button variant="soft" color="gray" onClick={cancel}>
            点错了
          </Button>
          <Button variant="soft" color="red" onClick={() => handleDoNext(false)}>
            不保存
          </Button>
          <Button onClick={() => handleDoNext(true)}>保存</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}