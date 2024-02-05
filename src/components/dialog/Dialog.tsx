// Dialog.tsx
import React, { useContext, useEffect, useState } from 'react';
import { DialogContext } from './DialogContext';
import { Button, Dialog as RadixDialog, Flex } from '@radix-ui/themes';

export function useDialog() {
  const context = useContext(DialogContext);
  context.type = 'confirm';
  return context
}

export function useInfoDialog() {
  const context = useContext(DialogContext);
  context.type = 'info';
  return context
}

// --------------------------------------------------

export const Dialog = () => {
  const { options, closeDialog, isOpen, type } = useContext(DialogContext);
  // console.log(type);

  if (!options) {
    return null;
  }

  const handleConfirm = () => {
    options.onConfirm?.();
    closeDialog();
  };

  const handleDeny = () => {
    options.onDeny?.();
    closeDialog();
  };

  const handleCancel = () => {
    closeDialog();
  };

  return (
    <RadixDialog.Root open={isOpen}
      onOpenChange={(open) => { if (!open) closeDialog() }}>
      <RadixDialog.Content style={{ maxWidth: 450 }}>
        <RadixDialog.Title>{options.title}</RadixDialog.Title>
        <RadixDialog.Description size="2" mb="4">
          {options.content}
        </RadixDialog.Description>

        <Flex gap="3" mt="4" justify={type === "confirm" ? "between" : "end"}>
          {type === "confirm" && <RadixDialog.Close>
            <Button variant="soft" color="gray" onClick={handleCancel}>
              {options.cancelText ?? "取消"}
            </Button>
          </RadixDialog.Close>}

          <Flex gap="3">
            <Button variant="soft" color="gray" onClick={handleDeny}>
              {options.denyText ?? "不是"}
            </Button>
            <Button onClick={handleConfirm}>{options.confirmText ?? "好的"}</Button>
          </Flex>
        </Flex>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};