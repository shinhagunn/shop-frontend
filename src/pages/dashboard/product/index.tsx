import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '~/assets/styles/pages/admin/product/index.less';
import BlockAdmin from '~/components/BlockAdmin';
import Table from '~/components/Table';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import useAdminStore from '~/stores/admin';
import { Align, Column, Product } from '~/types/index';

function Dashboard() {
  const AdminStore = useAdminStore();

  useEffect(() => {
    AdminStore.fetchProducts('');
  }, []);

  const columns = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,
    },
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'image',
      title: 'Image',
      align: Align.Left,
      scopedSlots: true,
    }, {
      key: 'price',
      title: 'Price',
      align: Align.Left,
      isCurrency: true,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Left,
      isTime: true,
    },
    {
      key: 'updated_at',
      title: 'Updated At',
      align: Align.Right,
      isTime: true,
    },
  ];

  const scopedSlotsRenderFunc = (item: Product, column: Column) => {
    switch (column.key) {
      case 'image':
        return (
          <img className={`${column.key} ${column.class} text-${column.align}`} src={item.image} />
        );
    }
  };

  return (
    <LayoutAdmin selected={4} pageName="Products">
      <div className="main">
        <BlockAdmin className="products" blockName="Table Products">
          <Link to="/dashboard/products/add" className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-3 my-2 inline-block text-white rounded w-28">Add product</Link>
          <Table is_router_link router_builder="/dashboard/products" data={AdminStore.products} columns={columns} scopedSlotsRenderFunc={(item: Product, column) => scopedSlotsRenderFunc(item, column)} />
        </BlockAdmin>
      </div>
    </LayoutAdmin>
  );
}

export default Dashboard;
