import useEditorStore, { toggleRangeBold, toggleRangeItalic, toggleRangeStrikeline, toggleRangeUnderline, toggleToolbar } from "@/store/editor"
import * as Toggle from '@radix-ui/react-toggle';
import { Bold, Code, Italic, ItalicIcon, Link, StrikethroughIcon, Underline } from "lucide-react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ContextMenu, Flex } from "@radix-ui/themes";
import Vditor from "vditor";
import { useEffect, useState } from "react";
import { getEditorSelection, getVditor } from "@/store/editor";

function EditorContextToolbar() {
  const selected = getEditorSelection() ?? ""

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

  const selectedClass = "text-primary hover:text-white bg-accent hover:bg-primary"

  return (
    <Flex gap={"1"}>
      <ContextMenu.Item onClick={() => toggleRangeBold(!isBold)} className={isBold ? selectedClass : ""}>
        <Bold className="h-4 w-4 " />
      </ContextMenu.Item>
      <ContextMenu.Item onClick={() => toggleRangeItalic(!isItalic)} className={isItalic ? selectedClass : ""}>
        <Italic className="h-4 w-4" />
      </ContextMenu.Item>
      <ContextMenu.Item onClick={() => toggleRangeStrikeline(!isStrikethrough)} className={isStrikethrough ? selectedClass : ""}>
        <StrikethroughIcon className="h-4 w-4" />
      </ContextMenu.Item>
      <ContextMenu.Item className={isCode ? selectedClass : ""}>
        <Code className="h-4 w-4" />
      </ContextMenu.Item>
    </Flex>
  )
}

export function EditorContextMenu(
  { children }:
    { children: React.ReactNode, vditor?: Vditor }
) {

  // const [toolbarVisible, setToolbarVisible] = useState(getVditor()?.getToolbarVisible() ?? false)

  const toolbarVisible = useEditorStore(s => s.toolbarVisible)

  return (
    <ContextMenu.Root >
      <ContextMenu.Trigger>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Content>

        <EditorContextToolbar />
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="⌘ D">Duplicate</ContextMenu.Item>
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
        <ContextMenu.Item onClick={toggleToolbar}>{toolbarVisible ? "隐藏工具栏" : "显示工具栏"}</ContextMenu.Item>
        <ContextMenu.Item>Add to favorites</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}