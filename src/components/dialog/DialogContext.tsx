// DialogContext.tsx
import { useState, createContext, ReactNode } from 'react';

type DialogOptions = {
  title: string;
  content: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type DialogContextType = {
  dialog: DialogOptions | null;
  open: boolean;
  openDialog: (options: DialogOptions) => void | null;
  closeDialog: () => void;
};

export const DialogContext = createContext<DialogContextType>({
  dialog: null,
  open: false,
  openDialog: (options: DialogOptions) => { },
  closeDialog: () => { },
});

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogOptions | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const openDialog = (options: DialogOptions) => {
    setDialog(options);
    setOpen(true);
  };

  const closeDialog = () => {
    setDialog(null);
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ dialog, open, openDialog, closeDialog, }}>
      {children}
    </DialogContext.Provider>
  );
};