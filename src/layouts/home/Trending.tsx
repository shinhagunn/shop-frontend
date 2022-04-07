import Block from "~/components/Block"
import BlockItem from "~/components/BlockItem"
import "~/assets/styles/layouts/trending.less"

function Trending() {
  return (
    <div className="container wide py-12">
      <Block>
        <BlockItem col={2}>
          <div className="trending-container overflow-hidden w-full cursor-pointer">
            <div className="trending trending-1"></div>
            <p className="title">Xu hướng 2022</p>
            <span className="name uppercase">Smartphone</span>
          </div>
        </BlockItem>
        <BlockItem col={0}>
        <div className="trending-container overflow-hidden w-full cursor-pointer">
            <div className="trending trending-2"></div>
            <p className="title">Xu hướng 2022</p>
            <span className="name uppercase">Iphone</span>
          </div>
        </BlockItem>
      </Block>
    </div>
  )
}

export default Trending