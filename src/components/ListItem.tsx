import { ReactNode } from "react"

export interface ListItemProps {
  leading: ReactNode,
  leadingSpace?: number, // 用于调整 leading 元素与左侧的间距
  children: ReactNode,
  trailing: ReactNode,
  onClick: () => void,
  className?: string
}

export function ListItem({ leading, leadingSpace, children, trailing, onClick, className }: ListItemProps) {
  return (
    <button onClick={onClick}
      className={`flex px-3 py-2 hover:underline ${(className ?? "")} w-full`}>
      <span className="flex-shrink-0 self-center h-full" style={{ paddingLeft: leadingSpace ?? 0 }}>
        {leading}
      </span>

      {/* <div style={{ width: 20 * props.depth }}></div>
      {fileIcon} */}

      <div className="ml-2 select-none text-ellipsis text-left text-nowrap line-clamp-1">
        {children}
      </div>

      <div className="flex-1"></div>

      {trailing}
    </button>
  )
}