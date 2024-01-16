import { Button, Separator, Tooltip } from '@radix-ui/themes';
import { AsideMenuBarItemProps, sidebarBottomItems, sidebarTopItems } from './menuItems';

function AsideMenuBarItem({ props }: { props: AsideMenuBarItemProps }) {
  if (props.isSeparator) {
    return (
      <Separator className='w-6 self-center my-0.5'
        style={{ height: 1.2 }} />
    )
  }

  if (props.isDisabled) {
    return (
      <Button disabled variant='ghost' highContrast className='px-2 py-2 m-1 rounded'
        onClick={() => props.onClick?.()}>
        {props.icon}
      </Button>
    )
  }
  return (
    <Tooltip side='right' content={props.label} delayDuration={0} >
      <Button variant='ghost' highContrast className='px-2 py-2 m-1 rounded'
        onClick={() => props.onClick?.()}>
        {props.icon}
      </Button>
    </Tooltip>
  )
}

export const AsideMenuBar = () => {

  return (
    <div className='flex flex-col h-full pt-1 pb-3 border-r'>

      {sidebarTopItems.map((e) => {
        return <AsideMenuBarItem props={e} />
      })}

      {/* <AsideMenuBarItem props={items.toggleFolderViewMenuItem} />
      <Separator className='w-6 self-center my-1'></Separator>
      <AsideMenuBarItem props={items.searchMenuItem} />
      <AsideMenuBarItem props={items.exportMenuItem} /> */}
      <div className='flex-1'></div>

      {sidebarBottomItems.map((e) => {
        return <AsideMenuBarItem props={e} />
      })}
    </div>
  )
};
