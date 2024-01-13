import { useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import DirectorySideBar from "@/components/DirectorySideBar";
import { toggleRangeBold, toggleRangeItalic, toggleRangeDeleteline } from "./EditorActions";
import * as Toggle from '@radix-ui/react-toggle';
import { Bold, Code, Italic, ItalicIcon, Link, StrikethroughIcon, Underline } from "lucide-react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ContextMenu, Flex } from "@radix-ui/themes";


let vditor: Vditor;

function closeContextMenu() {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
}

function EditorContextToolbar() {
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

function EditorContextMenu({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Content>

        <EditorContextToolbar />
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

export default function Editor() {
  const [vditorInstance, setVditorInstance] = useState<Vditor>();

  useEffect(() => {
    const optioins: IOptions = {
      after: () => {
        vditor.setValue("`Vditor` 最小代码示例 ssss");
        setVditorInstance(vditor);
      },
      // cdn: "https://npm.onmicrosoft.cn/vditor@3.9.8",
      cdn: "./lib",
      height: "100vh",
      upload: {
        // TODO 在这里处理外部粘贴的图片
        handler: (files) => {
          vditor.insertValue("![](images.png)")
          return null
        },
      },
      input: (v) => {
        console.log("input:", v);
      },
    }

    vditor = new Vditor("vditor", optioins);
  }, []);

  return (
    <div className="flex">
      <DirectorySideBar />
      <EditorContextMenu>
        <div id="vditor" className="vditor overflow-y-auto flex-grow" />
      </EditorContextMenu>
    </div>
  )
}