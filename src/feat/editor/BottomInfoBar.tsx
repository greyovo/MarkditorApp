import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { Code2Icon, CodeIcon, ListIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import { DocInfoRow } from "./DocInfoRow";
import { redo, toggleOutline, undo } from "@/store/editor";

type BottomInfoBarButtonProps = {
  tooltip: string;
  onClick: () => void;
  children: React.ReactNode;
}

function BottomInfoBarButton(props: BottomInfoBarButtonProps) {
  return (
    <Tooltip content={props.tooltip}>
      <IconButton variant='ghost'
        className="px-2 py-2 mx-0"
        radius="none"
        onClick={props.onClick}>
        {props.children}
      </IconButton>
    </Tooltip>
  )
}

export function BottomInfoBar() {
  const iconSize = 17
  return (
    <div className="flex justify-between items-center border-t bg-background">
      <Flex gap="1" grow={"1"}>
        <BottomInfoBarButton tooltip={"大纲"} onClick={() => { toggleOutline() }}>
          <ListIcon width={iconSize} />
        </BottomInfoBarButton>

        <BottomInfoBarButton tooltip={"源码模式"} onClick={() => { }}>
          <Code2Icon width={iconSize} />
        </BottomInfoBarButton>

        <BottomInfoBarButton tooltip={"撤销"} onClick={() => { undo() }}>
          <Undo2Icon width={iconSize} />
        </BottomInfoBarButton>

        <BottomInfoBarButton tooltip={"重做"} onClick={() => { redo() }}>
          <Redo2Icon width={iconSize} />
        </BottomInfoBarButton>

        <div className="flex-1"></div>
        <DocInfoRow />
      </Flex>
    </div>
  );
}