import Block from "~/components/Block"
import BlockItem from "~/components/BlockItem"
import "~/assets/styles/layouts/info_number.less"

function InfoNumber() {
  return (
    <div className="info-number pb-16 pt-10 my-16">
       <div className="container wide">   
        <Block>
          <BlockItem col={4}>
            <h4 className="text-4xl font-bold pb-3">1280</h4>
            <p>SẢN PHẨM</p>
          </BlockItem>
          <BlockItem col={4}>
            <h4 className="text-4xl font-bold pb-3">8</h4>
            <p>GIẢI THƯỞNG</p>
          </BlockItem>
          <BlockItem col={4}>
            <h4 className="text-4xl font-bold pb-3">3898</h4>
            <p>KHÁCH HÀNG HÀI LÒNG</p>
          </BlockItem>
          <BlockItem col={4}>
            <h4 className="text-4xl font-bold pb-3">25</h4>
            <p>CHI NHÁNH CỬA HÀNG</p>
          </BlockItem>
        </Block>
       </div>
    </div>
  )
}

export default InfoNumber