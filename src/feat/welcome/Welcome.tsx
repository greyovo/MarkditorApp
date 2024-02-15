import { selectFile, selectRootDir } from "@/store/directory";
import { createNewDoc } from "@/store/document";
import { Box, Button, Flex } from "@radix-ui/themes";
import { FileTextIcon, FolderIcon, HomeIcon, PencilIcon } from "lucide-react";

export function Welcome() {
  return (
    <div className="flex flex-col bg-background p-10 gap-2 justify-center align-middle" style={{ height: "100%" }}>
      <div>
        <p className="text-4xl select-none">
          🤗 Welcome to <b ><span className="text-blue-700">Mark</span><span >ditor</span>.</b>
        </p>

        <Flex gap="3" mt="5">
          <Button size={"3"} onClick={createNewDoc}>
            <PencilIcon width={16} />新建 Markdown
          </Button>
          <Button variant="soft" size={"3"} onClick={selectFile}>
            <FileTextIcon width={16} />打开文档 ...
          </Button>
          <Button variant="soft" size={"3"} onClick={selectRootDir}>
            <FolderIcon width={16} />打开文件夹 ...
          </Button>
        </Flex>
      </div>
    </div>
  )
}