import useEditorStore, { getVditor, editorAction } from "@/store/editor"
import * as Toggle from '@radix-ui/react-toggle';
import { Bold, Code, Italic, ItalicIcon, Link, StrikethroughIcon, Underline } from "lucide-react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ContextMenu, Flex } from "@radix-ui/themes";
import Vditor from "vditor";
import { useEffect, useState } from "react";

function EditorContextToolbar({ selected }: { selected: string }) {
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
      <ContextMenu.Item onClick={() => editorAction.toggleRangeBold(!isBold)} className={isBold ? selectedClass : ""}>
        <Bold className="h-4 w-4 " />
      </ContextMenu.Item>
      <ContextMenu.Item onClick={() => editorAction.toggleRangeItalic(!isItalic)} className={isItalic ? selectedClass : ""}>
        <Italic className="h-4 w-4" />
      </ContextMenu.Item>
      <ContextMenu.Item onClick={() => editorAction.toggleRangeStrikeline(!isStrikethrough)} className={isStrikethrough ? selectedClass : ""}>
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

  const [hasSelection, setHasSelection] = useState(false)
  const [selected, setSelected] = useState("")

  function onOpenChange(open: boolean) {
    if (open) {
      const text = editorAction.getEditorSelection() ?? ""
      setSelected(text)
      setHasSelection(text.length > 0)
    }
  }

  const toolbarVisible = useEditorStore(s => s.toolbarVisible)

  return (
    <ContextMenu.Root onOpenChange={onOpenChange}>
      <ContextMenu.Trigger>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <EditorContextToolbar selected={selected} />

        <ContextMenu.Separator />

        <ContextMenu.Item onClick={editorAction.insertImage}>插入图片...</ContextMenu.Item>

        {/* <ContextMenu.Item onClick={editorAction.insertTable}>添加表格...</ContextMenu.Item> */}

        {/* <ContextMenu.Item onClick={editorAction.}>插入段落(上)</ContextMenu.Item> */}

        {/* <ContextMenu.Item onClick={editorAction.}>插入段落(下)</ContextMenu.Item> */}

        <ContextMenu.Separator />

        <ContextMenu.Item disabled={!hasSelection} shortcut="Ctrl X"
          onClick={editorAction.cutContent}>剪切</ContextMenu.Item>

        <ContextMenu.Item disabled={!hasSelection} shortcut="Ctrl C"
          onClick={editorAction.copyContent}>复制</ContextMenu.Item>

        <ContextMenu.Item shortcut="Ctrl V"
          onClick={editorAction.pasteContent}>粘贴</ContextMenu.Item>

        {/* <ContextMenu.Sub>
          <ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Move to project…</ContextMenu.Item>
            <ContextMenu.Item>Move to folder…</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Advanced options…</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub> */}

        <ContextMenu.Separator />
        <ContextMenu.Item onClick={() => editorAction.toggleToolbar()}>
          {toolbarVisible ? "隐藏工具栏" : "显示工具栏"}
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}