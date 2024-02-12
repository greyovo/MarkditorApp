import { ReactNode } from "react";

type WindowActionButtonProps = { children: ReactNode; onClick: () => void; isDanger?: boolean; };
export const WindowActionButton = ({ children, onClick, isDanger = false }: WindowActionButtonProps) => {
  const cls = isDanger
    ? "hover:bg-red-600 hover:text-white active:text-white active:bg-red-800"
    : "hover:bg-accent active:text-accent-foreground active:bg-accent active:opacity-40";
  return (
    <div className={"px-1 py-1 w-11 h-8 text-center flex items-center justify-center transition ease-in-out duration-200 "
      + cls} onClick={onClick}>
      {children}
    </div>
  );
};
