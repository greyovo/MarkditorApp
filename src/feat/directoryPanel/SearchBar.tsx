import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("")

  function doSearch() {
    if (query.trim().length === 0)
      return

    console.log("Searching for:", query);
  }

  return (
    <div className="flex w-full">
      <TextField.Root className="w-full">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          onInput={(e) => setQuery(e.currentTarget.value)}
          placeholder="搜索文件..." value={query} />
      </TextField.Root>


      <Button ml="2" disabled={!(query.trim().length > 0)} onClick={() => setQuery("")}>搜索</Button>
    </div>
  )
}
