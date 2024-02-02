// Dialog.tsx
import React, { useContext, useEffect, useState } from 'react';
import { DialogContext } from './DialogContext';
import { Button, Dialog as RadixDialog, Flex } from '@radix-ui/themes';

export function useDialog() {
  return useContext(DialogContext);
}

export const Dialog = () => {
  const { dialog, closeDialog, open } = useContext(DialogContext);

  if (!dialog) {
    return null;
  }

  const { title, content, onConfirm, onCancel } = dialog;

  const handleConfirm = () => {
    onConfirm?.();
    closeDialog();
  };

  const handleCancel = () => {
    onCancel?.();
    closeDialog();
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={(open) => {
      if(!open) closeDialog()
    }}>
      <RadixDialog.Content style={{ maxWidth: 450 }}>
        <RadixDialog.Title>{title}</RadixDialog.Title>
        <RadixDialog.Description size="2" mb="4">
          {content}
        </RadixDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <RadixDialog.Close>
            <Button variant="soft" color="gray" onClick={handleCancel}>
              取消
            </Button>
          </RadixDialog.Close>
          <Button onClick={handleConfirm}>好的</Button>
        </Flex>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};