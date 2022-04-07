import Button from "~/components/Button"
import "~/assets/styles/components/product_item.less"
import { CurrencyHTML } from "~/mixins/helper"
import { Link } from "react-router-dom"

interface ProductItemProps {
  id: string
  src: React.ImgHTMLAttributes<HTMLImageElement>["src"]
  name: string
  price: number
  discount: number
}

function ProductItem(props :ProductItemProps) {
  const discount = props.discount ? props.discount : 0

  return (
    <Link to={`/san-pham/${props.id}`} className="product mb-6">
      <img className="p-3" src={props.src}/>
      <div className="product-info">
        <p className="product-name py-3 font-bold h-16">{props.name}</p>
        <div className="mb-3 p-1">
          {discount != 0 ? (<span className="product-oldprice text-color line-through mr-2">{CurrencyHTML(props.price)}</span>): (<span></span>)}
          <span className="product-oldprice text-color font-bold">{CurrencyHTML(props.price * (1 - discount))}</span>
        </div>
        <Button className="btn-color btn-hover text-white text-xs p-2 font-bold mb-8">THÊM VÀO GIỎ</Button>
      </div>
      <div className="favorite">
        <i className="fa-solid fa-heart"></i>
      </div>
    </Link>
  )
}

export default ProductItem