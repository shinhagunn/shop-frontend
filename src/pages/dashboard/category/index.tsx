import { useEffect, useState } from 'react';
import '~/assets/styles/pages/admin/category/index.less';
import BlockAdmin from '~/components/BlockAdmin';
import Input from '~/components/Input';
import Table from '~/components/Table';
import Button from '~/components/Button';
import Block from '~/components/Block';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import useAdminStore from '~/stores/admin';
import { Align } from '~/types/index';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

function CategoryAdminPage() {
  const AdminStore = useAdminStore();

  const [name, setName] = useState('');

  useEffect(() => {
    AdminStore.fetchCategories();
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
      key: 'created_at',
      title: 'Created At',
      align: Align.Left,
      isTime: true,
    },
    {
      key: 'updated_at',
      title: 'Updated At',
      align: Align.Left,
      isTime: true,
    },
    {
      key: 'remove',
      title: 'Action',
      align: Align.Right,
      isTime: true,
    },
  ];

  const handleAdd = async () => {
    try {
      await new ApiClient().post('/api/v2/product/admin/category', {
        name,
      });
      AddToast('Success', 'Add category thành công', 'toast');
      AdminStore.fetchCategories();
    } catch (error) {
      return error;
    }
  };

  return (
    <LayoutAdmin selected={3} pageName="Categories">
      <div className="main">
        <BlockAdmin className="category" blockName="Add Category">
          <Block className="justify-between p-3 items-center">
            <div>
              Name:
              <Input type="text" className="ml-2 focus:outline-none border-color pl-2 py-1 w-80" placeholder="Name ..." onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-1 text-white rounded w-28" onClick={() => handleAdd()}>Add</Button>
            </div>
          </Block>
        </BlockAdmin>
        <BlockAdmin className="category" blockName="Table Categories">
          <Table data={AdminStore.categories} columns={columns} urlRemove="/api/v2/product/admin/category/" />
        </BlockAdmin>
      </div>
    </LayoutAdmin>
  );
}

export default CategoryAdminPage;
