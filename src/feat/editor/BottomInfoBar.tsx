import { Button, Flex, IconButton, Tooltip } from "@radix-ui/themes";
import { Code2Icon, CodeIcon, ListIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import { DocInfoRow } from "./DocInfoRow";

type BottomInfoBarButtonProps = {
  tooltip: string;
  onClick: () => void;
  children: React.ReactNode;
}

function BottomInfoBarButton(props: BottomInfoBarButtonProps) {
  return (
    <Tooltip content={props.tooltip}>
      <IconButton variant="soft"
        className="bg-transparent hover:bg-blue-50 active:bg-blue-100"
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
    <div className="flex justify-between items-center">
      <Flex gap="1" grow={"1"}>
        <BottomInfoBarButton tooltip={"大纲"} onClick={() => { }}>
          <ListIcon width={iconSize} />
        </BottomInfoBarButton>

        <BottomInfoBarButton tooltip={"源码模式"} onClick={() => { }}>
          <Code2Icon width={iconSize} />
        </BottomInfoBarButton>

        <BottomInfoBarButton tooltip={"撤销"} onClick={() => { }}>
          <Undo2Icon width={iconSize} />
        </BottomInfoBarButton>

        <BottomInfoBarButton tooltip={"重做"} onClick={() => { }}>
          <Redo2Icon width={iconSize} />
        </BottomInfoBarButton>

        <div className="flex-1"></div>
        <DocInfoRow />
      </Flex>
    </div>
  );
}