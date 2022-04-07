/* eslint-disable no-return-assign */
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
import {
  Align, CartProductDetail, Column, Order, OrderProduct,
} from '~/types';
import useUserStore from '~/stores/user';
import '~/assets/styles/pages/user/order.less';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

function OrderPage() {
  const userStore = useUserStore();

  const navigate = useNavigate();

  const redirect = () => {
    navigate('/');
  };

  useEffect(() => {
    userStore.fetchOrders();
  }, []);

  const columns: Column[] = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,
    },
    {
      key: 'tong_gia',
      title: 'TỔNG GIÁ',
      align: Align.Left,
      scopedSlots: true,
      isCurrency: true,
    },
    {
      key: 'created_at',
      title: 'NGÀY TẠO',
      align: Align.Left,
      isTime: true,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      align: Align.Right,
      scopedSlots: true,
    },
  ];

  const scopedSlotsRenderFunc = (item: Order, column: Column) => {
    switch (column.key) {
      case 'tong_gia':
        return (
          <span className={`${column.key}`}>{CurrencyHTML(item.order_product.reduce((x, product) => x + product.price, 0))}</span>
        );
      case 'status':
        return (
          <div className={`${column.key}`}>
            <Button className={`btn btn-icon inline-block p-2 text-white rounded ${item.status === 'Pending' ? 'bg-slate-300' : ''} ${item.status === 'Arrived' ? 'bg-emerald-300' : ''} ${item.status === 'Delivering' ? 'bg-cyan-300' : ''} ${item.status === 'Delete' ? 'bg-red-300' : ''}`}>{item.status}</Button>
          </div>
        );
    }
  };

  return (
    <>
      <Header target={6} />
      {userStore.orders && userStore.orders.length !== 0 ? (
        <div className="container wide py-12">
          <Block className="flex-wrap">
            <BlockItem col={0}>
              <h3 className="text-center font-bold text-2xl mb-8">DANH SÁCH ĐƠN HÀNG</h3>
              <Table is_router_link router_builder="/user/order" data={userStore.orders} columns={columns} scopedSlotsRenderFunc={(item: Order, column: Column) => scopedSlotsRenderFunc(item, column)} />
              <Button className="btn-cart mt-8" onClick={redirect}>TIẾP TỤC XEM SẢN PHẨM</Button>
            </BlockItem>
          </Block>
        </div>
      ) : (
        <div className="flex flex-col items-center my-24">
          <p>Chưa có đơn hàng nào</p>
          <Button className="btn btn-color btn-hover btn-icon text-white p-3 rounded mt-4 font-bold text-sm" onClick={redirect}>QUAY TRỞ LẠI CỬA HÀNG</Button>
        </div>
      )}

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default OrderPage;
