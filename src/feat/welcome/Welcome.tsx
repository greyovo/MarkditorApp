import { openFile } from "@/store/directory";
import { createNewDoc, selectDoc } from "@/store/document";
import { Box, Button, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { FolderIcon, HomeIcon, PencilIcon } from "lucide-react";

export function Welcome() {
  return (
    <div className="flex flex-col p-10 gap-2 justify-center align-middle" style={{ height: "100%" }}>
      <div>
        <p className="text-4xl select-none">
          🤗 Welcome to <b ><span className="text-blue-700">Mark</span><span >ditor</span>.</b>
        </p>

        <div className="my-6">
          <Button className="mr-3 my-1" size={"3"} onClick={createNewDoc}>
            <PencilIcon width={16} />新建文件
          </Button>
          <Button className="my-1" variant="soft" size={"3"} onClick={selectDoc}>
            <FolderIcon width={16} />打开 ...
          </Button>
        </div>
      </div>
    </div>
  )
}