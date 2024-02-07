import { Listbox, ListboxItem, ListboxItemProps, ListboxSection, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ReactNode, useState } from "react";
import { CollectionChildren } from "@react-types/shared/src/collections";

type ContextMenuProps = {
  children: CollectionChildren<typeof ListboxItem>
  trigger: ReactNode
  topContent: ReactNode
}

export function ContextMenu(props: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ left: 0, top: 0 })

  return (
    <>
      <div onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setPosition({
          left: e.clientX + 2,
          top: e.clientY + 2
        })
        setIsOpen(true)
      }}>
        {props.trigger}
      </div>

      <div className="absolute" style={position}>
        <Popover placement={"right-start"}
          onOpenChange={(open) => setIsOpen(open)} isOpen={isOpen}>
          <PopoverTrigger><div></div></PopoverTrigger>
          <PopoverContent className="p-1">
            <Listbox label="DirContextMenu"
              className="w-[150px] select-none"
              onAction={() => setIsOpen(false)}
              topContent={props.topContent}
            >
              {props.children}
            </Listbox>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}