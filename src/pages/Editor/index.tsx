import { useEffect, useRef, useState } from "react";
import Vditor from "vditor";
import DirectorySideBar from "@/components/DirectorySideBar";
import { EditorContextMenu } from "./EditorContextMenu";

let vditor: Vditor;

export function Editor() {
  useEffect(() => {
    const optioins: IOptions = {
      after: () => {
        vditor.setValue("`Vditor` 最小代码示例 ssss");
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
      <EditorContextMenu vditor={vditor}>
        <div id="vditor" className="vditor overflow-y-auto flex-grow" />
      </EditorContextMenu>
    </div>
  )
}