import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '~/assets/styles/pages/cart.less';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Button from '~/components/Button';
import Table from '~/components/Table';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import { CurrencyHTML } from '~/mixins/helper';
import { Align, CartProductDetail, Column } from '~/types';
import useUserStore from '~/stores/user';
import '~/assets/styles/pages/user/cart.less';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

function CartPage() {
  const userStore = useUserStore();

  const navigate = useNavigate();

  const redirect = () => {
    navigate('/');
  };

  useEffect(() => {
    userStore.fetchCartProductDetail();
  }, []);

  const columns: Column[] = [
    {
      key: 'san_pham',
      title: 'SẢN PHẨM',
      scopedSlots: true,
      align: Align.Left,
    },
    {
      key: 'price',
      title: 'GIÁ',
      align: Align.Left,
      scopedSlots: true,
      isCurrency: true,
    },
    {
      key: 'quantity',
      title: 'SỐ LƯỢNG',
      align: Align.Left,
      scopedSlots: true,
    },
    {
      key: 'total',
      title: 'TỔNG',
      align: Align.Right,
      scopedSlots: true,
      isCurrency: true,
    },
  ];

  const handleRemoveProduct = async (id: string) => {
    try {
      await new ApiClient().delete(`/api/v2/product/resource/user/cart/${id}`);
      AddToast('Success', 'Remove product thành công!', 'toast');
      userStore.fetchCartProductDetail();
    } catch (error) {
      AddToast('Error', 'Remove product không thành công!', 'toast');
      return error;
    }
  };

  const handleOrder = async () => {
    try {
      if (userStore.user) {
        if (!userStore.user.user_profile.fullname || !userStore.user.user_profile.phone || !userStore.user.user_profile.address) {
          AddToast('Error', 'Bạn phải cập nhật thông tin cần thiết trước khi order!', 'toast');
          navigate('/user');
          return;
        }
      }
      await new ApiClient().get('/api/v2/product/resource/user/cart/order');
      AddToast('Success', 'Order thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Order không thành công!', 'toast');
      return error;
    }
  };

  const scopedSlotsRenderFunc = (item: CartProductDetail, column: Column) => {
    switch (column.key) {
      case 'san_pham':
        return (
          <div className={`${column.key} flex items-center`}>
            <Button onClick={() => handleRemoveProduct(item.product.id)}>
              <i className="fa-solid fa-xmark text-sm" />
            </Button>
            <img className="w-16 p-2" src={item.product.image} />
            <span>{item.product.name}</span>
          </div>
        );
      case 'price':
        return (
          <span className={`${column.key}`}>{CurrencyHTML(item.product.price * (1 - (item.product.discount ?? 0)))}</span>
        );
      case 'quantity':
        return (
          <span className={`${column.key}`}>{item.quantity}</span>
        );
      case 'total':
        return (
          <span className={`${column.key}`}>{CurrencyHTML(item.quantity * (item.product.price * (1 - (item.product.discount ?? 0))))}</span>
        );
    }
  };

  return (
    <>
      <Header target={6} />
      {userStore.cart && userStore.cart.length !== 0 ? (
        <div className="container wide py-12">
          <Block className="flex-wrap">
            <BlockItem col={0} className="border-r-2">
              <Table data={userStore.cart} columns={columns} scopedSlotsRenderFunc={(item: CartProductDetail, column: Column) => scopedSlotsRenderFunc(item, column)} />
              <Button className="btn-cart mt-8" onClick={redirect}>TIẾP TỤC XEM SẢN PHẨM</Button>
            </BlockItem>
            <BlockItem col={3}>
              <h3 className="p-4 font-bold border-b-2">TỔNG SỐ LƯỢNG</h3>
              <Block className="justify-between px-4 py-2 items-center">
                <span>Tổng phụ</span>
                <span>
                  {CurrencyHTML(userStore.cart?.reduce((pre, value) => {
                    const d = (value.product.discount ?? 0);
                    return pre + (value.quantity * (value.product.price * (1 - d)));
                  }, 0))}

                </span>
              </Block>
              <Block className="justify-between px-4 py-2 items-center">
                <span>Giao hàng</span>
                <span className="text-sm">Giao hàng miễn phí</span>
              </Block>
              <Block className="justify-between px-4 py-2 items-center">
                <span>Tổng</span>
                <span className="font-bold">
                  {CurrencyHTML(userStore.cart?.reduce((pre, value) => {
                    const d = value.product.discount ? value.product.discount : 0;
                    return pre + (value.quantity * (value.product.price * (1 - d)));
                  }, 0))}

                </span>
              </Block>
              <Button className="btn btn-color btn-hover btn-icon w-full py-1 text-white mt-8" onClick={() => handleOrder()}>TIẾN HÀNH THANH TOÁN</Button>
            </BlockItem>
          </Block>
        </div>
      ) : (
        <div className="flex flex-col items-center my-24">
          <p>Chưa có sản phẩm nào trong giỏ hàng</p>
          <Button className="btn btn-color btn-hover btn-icon text-white p-3 rounded mt-4 font-bold text-sm" onClick={redirect}>QUAY TRỞ LẠI CỬA HÀNG</Button>
        </div>
      )}

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default CartPage;
