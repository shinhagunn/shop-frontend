import "~/assets/styles/components/block_item.less"

interface BlockItemProps {
  col?: number
  className?: string
}

function BlockItem(props: React.PropsWithChildren<BlockItemProps>) {
  return (
    <div className={`block-item ${props.className} col-${props.col ?? "a"}`}>
      {props.children}
    </div>
  )
}

export default BlockItem
