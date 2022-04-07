import "~/assets/styles/layouts/list.less"

function List(props: any) {
  return (
    <div className="list">
      <h4>{props.title}</h4>

      <div className="box">
        {props.children}
      </div>
    </div>
  )
}

export default List