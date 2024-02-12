import { IconButton, Tooltip } from "@radix-ui/themes"

export interface TitleMenuItemProps {
  icon: React.ReactNode,
  label: string,
  onClick?: () => void,
  isDisabled?: boolean,
  className?: string,
  isSeparator?: boolean
}

export function TitleMenuItem({ props }: { props: TitleMenuItemProps }) {
  if (props.isDisabled) {
    return (
      <IconButton disabled variant='ghost' radius="none" className='px-3 py-2 m-0 text-muted'
        onClick={() => props.onClick?.()}>
        {props.icon}
      </IconButton>
    )
  }
  return (
    <Tooltip side='bottom' content={props.label} delayDuration={0} >
      <IconButton variant="ghost" size="1" radius="none" className='px-3 py-2 mx-0'
        onClick={() => props.onClick?.()}>
        {props.icon}
      </IconButton>
    </Tooltip>
  )
}

