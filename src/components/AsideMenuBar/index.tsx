// import React from 'react';
// import { Button, DropdownMenu, IconButton } from '@radix-ui/themes';
// import { FolderIcon, HomeIcon } from '@heroicons/react/24/outline';
// import { FileIcon } from 'lucide-react';

// type AsideMenuBarItemProps = {
//   icon: React.ReactNode,
//   label: string,
//   onClick?: () => void,
//   isActive?: boolean,
//   isDisabled?: boolean,
//   className?: string,
// }

// function AsideMenuBarItem(props: AsideMenuBarItemProps) {
//   return (
//     <button
//       className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
//       aria-label="Update dimensions"
//     >
//       <FileIcon width={22} />
//     </button>
//     // <IconButton className='p-3' variant="soft" size={"4"}>
//     //   <FileIcon width={22} />
//     // </IconButton>
//   )
// }

// export function AsideMenuBar() {

//   return (
//     <DropdownMenu.Root>
//       <DropdownMenu.Trigger>
//         {/* <AsideMenuBarItem icon={undefined} label={''} /> */}
//         <IconButton className='p-3 hover:bg-blue-50 active:bg-blue-100' variant="soft" size={"4"}>
//           <FileIcon width={22} />
//         </IconButton>
//       </DropdownMenu.Trigger>
//       <DropdownMenu.Content>
//         <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
//         <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
//         <DropdownMenu.Separator />
//         <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

//         <DropdownMenu.Sub>
//           <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
//           <DropdownMenu.SubContent>
//             <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
//             <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

//             <DropdownMenu.Separator />
//             <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
//           </DropdownMenu.SubContent>
//         </DropdownMenu.Sub>

//         <DropdownMenu.Separator />
//         <DropdownMenu.Item>Share</DropdownMenu.Item>
//         <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
//         <DropdownMenu.Separator />
//         <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
//           Delete
//         </DropdownMenu.Item>
//       </DropdownMenu.Content>
//     </DropdownMenu.Root>
//   )
// };

import React from 'react';
// import * as Menubar from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, DotIcon, SquareIcon } from 'lucide-react';
// import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from '@radix-ui/themes';
import { CodeBracketIcon, MinusIcon, Square2StackIcon, StopIcon, XMarkIcon } from '@heroicons/react/24/outline';

const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis'];
const CHECK_ITEMS = ['Always Show Bookmarks Bar', 'Always Show Full URLs'];

export const AsideMenuBar = () => {

  return (
    <Menubar className='flex'>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <Button className='text-black'
        variant='ghost'>
        <CodeBracketIcon width={20} />
      </Button>

      <div className='flex-1'></div>

      <Button className='text-black'
        variant='ghost'>
        <MinusIcon width={20} />
      </Button>

      <Button className='text-black'
        variant='ghost'>
        <StopIcon width={20} />
      </Button>

      <Button className='text-black'
        variant='ghost'>
        <Square2StackIcon width={20} />
      </Button>

      <Button className='text-black hover:text-destructive-foreground
      hover:bg-destructive active:bg-red-600'
        variant='ghost'>
        <XMarkIcon width={20} />
      </Button>
    </Menubar>
  )
};
