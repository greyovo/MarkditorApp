import useDocumentStore from "@/store/document"
import { FolderOpenIcon } from "@heroicons/react/24/outline"
import { Button, Flex, IconButton, Popover } from "@radix-ui/themes"
import { CheckCircle2, FolderOpen, LoaderIcon } from "lucide-react"

function DocInfoPopover({ children }: { children: React.ReactNode }) {
  const fileName = useDocumentStore((state) => state.fileName ?? "<无标题>")
  const path = useDocumentStore((state) => state.path ?? "<未保存>")
  const content = useDocumentStore((state) => state.content ?? "")

  let lineCount = 0
  for (const s of content) {
    if (s === '\n')
      lineCount++
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex className="text-sm" gap="2" direction="column">
          <div className="line-clamp-1 font-bold">{fileName}</div>
          <Flex justify="between" align="center" gap="5">
            <div className="line-clamp-3">{path}</div>
            <IconButton size="1" variant="soft"> <FolderOpen size={14} /></IconButton>
          </Flex>

          <Flex justify="between">
            <div>统计</div>
            <div>{lineCount} 行 / {content.trim().length} 字符</div>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export function DocInfoRow() {
  const saved = useDocumentStore(state => state.saved)
  const content = useDocumentStore(state => state.content ?? "")

  return (
    <DocInfoPopover>
      <Button variant="soft" highContrast
        className="bg-transparent hover:bg-blue-50 active:bg-blue-100" radius="none">
        <Flex gap="4" className="items-center text-sm select-none">
          <Flex gap="1" className={(saved ? "opacity-30" : "") + " items-center"}>
            {saved ? <CheckCircle2 strokeWidth={1.5} size={16} /> : <LoaderIcon strokeWidth={1.5} size={16} />}
            <div>{saved ? "已保存" : "未保存"}</div>
          </Flex>
          <div className="mr-1">{content.trim().length} 字符</div>
        </Flex>
      </Button>
    </DocInfoPopover>
  )
}