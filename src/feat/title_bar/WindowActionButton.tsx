import { ReactNode } from "react";

type WindowActionButtonProps = { children: ReactNode; onClick: () => void; isDanger?: boolean; };
export const WindowActionButton = ({ children, onClick, isDanger = false }: WindowActionButtonProps) => {
  const cls = isDanger
    ? "hover:bg-red-600 active:opacity-60 hover:text-foreground active:text-foreground"
    : "hover:bg-accent active:bg-accent active:opacity-60";
  return (
    <div className={"px-1 py-1 w-11 h-8 text-center flex items-center justify-center transition ease-in-out duration-200 "
      + cls} onClick={onClick}>
      {children}
    </div>
  );
};
