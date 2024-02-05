// DialogContext.tsx
import { useState, createContext, ReactNode } from 'react';

type DialogType = 'confirm' | 'info';

type DialogOptions = {
  title: string;
  content: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  onDeny?: () => void;
  denyText?: string;
  onCancel?: () => void;
  cancelText?: string;
};

type DialogContextType = {
  options: DialogOptions | null;
  type: DialogType;
  isOpen: boolean;
  openDialog: (options: DialogOptions) => void | null;
  closeDialog: () => void;
};

const initialContext: DialogContextType = {
  options: null,
  type: "info",
  isOpen: false,
  openDialog: (options: DialogOptions) => { },
  closeDialog: () => { },
}

export const DialogContext = createContext(initialContext);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<DialogOptions | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDialog = (options: DialogOptions) => {
    setOptions(options);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setOptions(null);
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider value={{ ...initialContext, options, isOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};