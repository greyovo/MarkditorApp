// Dialog.tsx
import React, { useContext, useState } from 'react';
import { DialogContext } from './DialogContext';
import { Button, Dialog as RadixDialog, Flex } from '@radix-ui/themes';

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
    // <div className=" bg-blend-overlay">
    //   <div className="dialog">
    //     <h2>{title}</h2>
    //     <p>{content}</p>
    //     <button onClick={handleConfirm}>Confirm</button>
    //     <button onClick={handleCancel}>Cancel</button>
    //   </div>
    // </div>
  );
};