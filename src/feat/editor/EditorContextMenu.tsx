import { toggleRangeBold, toggleRangeItalic, toggleRangeDeleteline } from "./actions"
import * as Toggle from '@radix-ui/react-toggle';
import { Bold, Code, Italic, ItalicIcon, Link, StrikethroughIcon, Underline } from "lucide-react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ContextMenu, Flex } from "@radix-ui/themes";
import Vditor from "vditor";

function EditorContextToolbar({ vditor }: { vditor: Vditor }) {
  const selected = vditor.getSelection()

  let isBold = false
  let isItalic = false
  let isStrikethrough = false
  let isCode = false

  if (selected.startsWith("**") && selected.endsWith("**")) {
    isBold = true
    if (selected.startsWith("***") && selected.endsWith("***")) {
      isItalic = true
    }
  } else if (selected.startsWith("*") && selected.endsWith("*")) {
    isItalic = true
  }

  if (selected.startsWith("~~") && selected.endsWith("~~")) {
    isStrikethrough = true
  }
  if (selected.startsWith("`") && selected.endsWith("`")) {
    isCode = true
  }

  const selectedClass = "text-blue-700 hover:text-white"

  return (
    <Flex gap={"1"}>
      <ContextMenu.Item className={isBold ? selectedClass : ""}>
        <Bold className="h-4 w-4 " />
      </ContextMenu.Item>
      <ContextMenu.Item className={isItalic ? selectedClass : ""}>
        <Italic className="h-4 w-4" />
      </ContextMenu.Item>
      <ContextMenu.Item className={isStrikethrough ? selectedClass : ""}>
        <StrikethroughIcon className="h-4 w-4" />
      </ContextMenu.Item>
      <ContextMenu.Item className={isCode ? selectedClass : ""}>
        <Code className="h-4 w-4" />
      </ContextMenu.Item>
    </Flex>
  )
}

export function EditorContextMenu(
  { children, vditor }:
  { children: React.ReactNode, vditor: Vditor }
) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Content>

        <EditorContextToolbar vditor={vditor}/>
        <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="⌘ N">Archive</ContextMenu.Item>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Move to project…</ContextMenu.Item>
            <ContextMenu.Item>Move to folder…</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Advanced options…</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator />
        <ContextMenu.Item>Share</ContextMenu.Item>
        <ContextMenu.Item>Add to favorites</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}