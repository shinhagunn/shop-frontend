/* eslint-disable no-return-assign */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '~/assets/styles/pages/cart.less';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Button from '~/components/Button';
import Table from '~/components/Table';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import { CurrencyHTML } from '~/mixins/helper';
import {
  Align, Column, OrderProduct,
} from '~/types';
import useUserStore from '~/stores/user';
import '~/assets/styles/pages/user/order_detail.less';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

function OrderPage() {
  const userStore = useUserStore();
  const { urlID } = useParams();
  const [id, setID] = useState('');

  const navigate = useNavigate();

  const redirect = () => {
    navigate('/user/orders');
  };

  useEffect(() => {
    if (urlID) {
      userStore.fetchOrder(urlID)
        .then((res) => {
          setID(res.id);
          if (!res.id) {
            redirect();
          }
        });
    }
  }, []);

  const columns: Column[] = [
    {
      key: 'san_pham',
      title: 'Sản phẩm',
      align: Align.Left,
      scopedSlots: true,
    },
    {
      key: 'price',
      title: 'Tổng giá',
      align: Align.Right,
      isCurrency: true,
    },
  ];

  const scopedSlotsRenderFunc = (item: OrderProduct, column: Column) => {
    switch (column.key) {
      case 'san_pham':
        return (
          <div className={`${column.key} flex items-center`}>
            <img className="w-16 p-2" src={item.image} />
            <span>{item.name}</span>
          </div>
        );
    }
  };

  const handleRemoveOrder = () => {
    try {
      if (userStore.order) {
        if (userStore.order.status !== 'Pending') {
          AddToast('Error', 'Không thể hủy đơn hàng đã được vận chuyển!', 'toast');
        } else {
          new ApiClient().delete(`/api/v2/product/resource/user/order/${id}`);
          AddToast('Success', 'Hủy đơn hàng thành công!', 'toast');
          redirect();
        }
      }
    } catch (error) {
      AddToast('Error', 'Hủy đơn hàng không thành công!', 'error');
      return error;
    }
  };

  return (
    <>
      <Header target={6} />

      <div className="container wide py-12">
        <h3 className="text-center font-bold text-2xl mb-8">{`Đơn hàng: ${id}`}</h3>
        <Block className="flex-wrap">
          <BlockItem col={2} className="border-r-2">
            <Table data={userStore.order?.order_product} columns={columns} scopedSlotsRenderFunc={(item:OrderProduct, column: Column) => scopedSlotsRenderFunc(item, column)} />
            {/* <Button className="btn-cart mt-8" onClick={redirect}>TIẾP TỤC XEM SẢN PHẨM</Button> */}
          </BlockItem>
          <BlockItem col={2}>
            <h3 className="p-4 font-bold border-b-2">TỔNG SỐ LƯỢNG</h3>
            <Block className="justify-between px-4 py-2 items-center">
              <span>Tổng phụ</span>
              <span>
                {CurrencyHTML(userStore.order?.order_product?.reduce((pre, value) => pre + value.price, 0))}
              </span>
            </Block>
            <Block className="justify-between px-4 py-2 items-center">
              <span>Giao hàng</span>
              <span className="text-sm">Giao hàng miễn phí</span>
            </Block>
            <Block className="justify-between px-4 py-2 items-center">
              <span>Tổng</span>
              <span className="font-bold">
                {CurrencyHTML(userStore.order?.order_product?.reduce((pre, value) => pre + value.price, 0))}
              </span>
            </Block>
          </BlockItem>
        </Block>
        <Block className="justify-between">
          <BlockItem>
            <Button className="btn btn-color btn-hover btn-icon text-white p-2 rounded mt-4 font-bold text-sm" onClick={redirect}>TRỞ LẠI DANH SÁCH</Button>
          </BlockItem>
          <BlockItem>
            <Button className="btn bg-red-300 hover:bg-red-400 btn-icon text-white p-2 rounded mt-4 font-bold text-sm" onClick={() => handleRemoveOrder()}>HỦY ĐƠN HÀNG</Button>
          </BlockItem>
        </Block>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default OrderPage;
