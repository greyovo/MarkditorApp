import { Button, Dialog, Flex, Separator, Tooltip } from '@radix-ui/themes';
import { AsideMenuBarItemProps, sidebarBottomItems, sidebarTopItems } from './menuItems';



export const AsideMenuBar = () => {

  return (
    <div className='flex flex-col h-full pt-1 pb-3 border-r'>

      {sidebarTopItems}
      <div className='flex-1'></div>
      {sidebarBottomItems}
    </div>
  )
};
