// DialogContext.tsx
import { useState, createContext, ReactNode } from 'react';

export type DialogContextType = {
  dialog: DialogData | null;
  open: boolean;
  openDialog: (title: string, content: string, onConfirm: () => void, onCancel: () => void) => void;
  closeDialog: () => void;
};

type DialogData = {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DialogContext = createContext<DialogContextType>({
  dialog: null,
  open: false,
  openDialog: () => { },
  closeDialog: () => { },
});

type DialogProviderProps = {
  children: ReactNode;
};

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialog, setDialog] = useState<DialogData | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const openDialog = (title: string, content: string, onConfirm: () => void, onCancel: () => void) => {
    setDialog({ title, content, onConfirm, onCancel });
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