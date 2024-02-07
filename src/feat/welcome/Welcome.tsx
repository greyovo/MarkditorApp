import { selectFile, selectRootDir } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Box, Button, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { FileTextIcon, FolderIcon, HomeIcon, PencilIcon } from "lucide-react";

export function Welcome() {
  return (
    <div className="flex flex-col p-10 gap-2 justify-center" style={{ height: "100%" }}>
      <p className="text-4xl select-none">
        🤗 Welcome to <b ><span className="text-blue-700">Mark</span><span >ditor</span>.</b>
      </p>

      <Flex className="my-4" gap="3">
        <Button size={"2"} onClick={createNewDoc}>
          <PencilIcon width={16} />新建 Markdown
        </Button>
        <Button variant="soft" size={"2"} onClick={selectFile}>
          <FileTextIcon width={16} />打开文档...
        </Button>
        <Button variant="soft" size={"2"} onClick={selectRootDir}>
          <FolderIcon width={16} />打开文件夹...
        </Button>
      </Flex>
    </div>
  )
}