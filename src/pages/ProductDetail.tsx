import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import ProductItem from '~/components/ProductItem';
import AddCart from '~/layouts/product-detail/AddCart';
import { CurrencyHTML, removeVietnameseTones } from '~/mixins/helper';
import usePublicStore from '~/stores/public';
import Input from '~/components/Input';
import Button from '~/components/Button';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';
import useUserStore from '~/stores/user';

function ProductDetailPage() {
  const publicStore = usePublicStore();
  const userStore = useUserStore();

  const [quantity, setQuantity] = useState(1);
  const [commentText, setCommentText] = useState('');

  const changeQuantity = (childData: any) => {
    setQuantity(childData);
  };

  const addCart = async () => {
    try {
      await new ApiClient().post('api/v2/product/resource/user/cart', {
        product_id: publicStore.product.id,
        quantity,
      });
      AddToast('Success', 'Add product thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add product không thành công!', 'toast');
      return error;
    }
  };

  const { id } = useParams();

  const category = publicStore.categories.find((category) => publicStore.product.category_id === category.id);
  let CategoryName = '';

  if (category !== undefined) {
    CategoryName = category.name;
  }

  useEffect(() => {
    publicStore.fetchProduct(id);
    publicStore.fetchCategories();
    publicStore.fetchProducts('limit=5');
    publicStore.fetchGetAllCommentInProduct(id);
  }, [id]);

  publicStore.product.discount = publicStore.product.discount ? publicStore.product.discount : 0;

  const handleAdd = async () => {
    try {
      await new ApiClient().post(`api/v2/product/resource/product/${id}/comment`, { content: commentText });
      AddToast('Success', 'Add comment thành công!', 'toast');
      publicStore.fetchGetAllCommentInProduct(id);
    } catch (error) {
      AddToast('Error', 'Add comment không thành công!', 'toast');
      return error;
    }
  };

  return (
    <>
      <Header target={6} />

      <div className="container wide py-8">
        <Block>
          <BlockItem col={2}>
            <img className="w-full" src={publicStore.product.image} />
          </BlockItem>
          <BlockItem col={2}>
            <>
              <Link to="/" className="text-sm text-gray-400 hover:text-gray-600">TRANG CHỦ</Link>
              {' '}
              /
              <Link to={`/danh-muc/${removeVietnameseTones(CategoryName)}`} className="text-sm uppercase text-gray-400 hover:text-gray-600">{` ${CategoryName}`}</Link>
            </>
            <h3 className="pt-8 pb-4 font-bold text-3xl">{publicStore.product.name}</h3>

            <div className="mb-3">
              {publicStore.product.discount !== 0 ? (<span className="product-oldprice text-color line-through mr-2 text-xl">{CurrencyHTML(publicStore.product.price)}</span>) : (<span />)}
              <span className="product-oldprice text-color font-bold text-xl">{CurrencyHTML(publicStore.product.price * (1 - publicStore.product.discount))}</span>
            </div>

            <p className="pt-2">{publicStore.product.description}</p>

            <p className="py-8">
              Danh mục:
              {' '}
              {CategoryName}
            </p>

            <AddCart value={String(quantity)} parentCallback={changeQuantity} addCart={addCart} />
          </BlockItem>
        </Block>
      </div>

      <div className="container wide py-12">
        <Block title="Bình luận">
          <div className="w-full">
            {userStore.logged ? (
              <Block>
                <BlockItem col={0}>
                  <Input type="text" className="w-full border-color focus:outline-none p-1 pl-2 rounded" placeholder="Nhập bình luận ở đây ..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                </BlockItem>
                <BlockItem col={6}>
                  <Button className="btn btn-color btn-hover btn-icon w-full h-full rounded text-white" onClick={() => handleAdd()}>Add</Button>
                </BlockItem>
              </Block>
            ) : ''}
            <div className="pl-6">
              {publicStore.comments?.map((comment) => (
                <div className="mb-4" key={comment.id}>
                  <span className="font-bold">{`${comment.user_name} `}</span>
                  :
                  {` ${comment.content} `}
                </div>
              ))}
            </div>
          </div>
        </Block>
      </div>

      <div className="container wide py-12">
        <Block title="Sản phẩm tương tự">
          {publicStore.products.map((product) => (
            <BlockItem col={5} key={product.id}>
              <ProductItem id={product.id} src={product.image} name={product.name} price={product.price} discount={product.discount} />
            </BlockItem>
          ))}
        </Block>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default ProductDetailPage;
