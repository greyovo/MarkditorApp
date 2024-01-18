import { Button, Separator, Tooltip } from '@radix-ui/themes';
import { AsideMenuBarItemProps, sidebarBottomItems, sidebarTopItems } from './menuItems';



export const AsideMenuBar = () => {

  return (
    <div className='flex flex-col h-full pt-1 pb-3 border-r'>

      {sidebarTopItems}

      {/* <AsideMenuBarItem props={items.toggleFolderViewMenuItem} />
      <Separator className='w-6 self-center my-1'></Separator>
      <AsideMenuBarItem props={items.searchMenuItem} />
      <AsideMenuBarItem props={items.exportMenuItem} /> */}
      <div className='flex-1'></div>
      {sidebarBottomItems}
      {/* {sidebarBottomItems.map((e) => {
        return <AsideMenuBarItem props={e} key={`AsideMenuBarItem${e.label}`} />
      })} */}
    </div>
  )
};
