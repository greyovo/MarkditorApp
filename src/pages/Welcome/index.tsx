import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { FolderIcon, PencilIcon } from "lucide-react";

export function Welcome() {
  return (
    <div className="flex flex-col p-10 gap-2 justify-center align-middle" style={{ height: "100vh" }}>
      <div>
        <text className="text-4xl select-none">
          🤗 Welcome to <b ><span className="text-blue-700">Mark</span><span >ditor</span>.</b>
        </text>

        <div className="my-6">
          <Button className="mr-3 my-1" size={"3"}><PencilIcon width={20} /> 新建文件</Button>
          <Button className="my-1" variant="soft" size={"3"}><FolderIcon width={20}/>打开 ...</Button>
        </div>
      </div>
    </div>
  )
}