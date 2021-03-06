import { useEffect } from 'react';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import BlockAdmin from '~/components/BlockAdmin';
import Table from '~/components/Table';
import useAdminStore from '~/stores/admin';
import { Align, Slide, Column } from '~/types/index';
import '~/assets/styles/pages/admin/user/index.less';

function UserAdminPage() {
  const AdminStore = useAdminStore();

  useEffect(() => {
    AdminStore.fetchUsers();
  }, []);

  const columns = [
    {
      key: 'uid',
      title: 'UID',
      align: Align.Left,
    },
    {
      key: 'email',
      title: 'Email',
      align: Align.Left,
      scopedSlots: true,
    },
    {
      key: 'state',
      title: 'State',
      align: Align.Left,
    },
    {
      key: 'role',
      title: 'Role',
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
  ];

  return (
    <div>
      <LayoutAdmin selected={2} pageName="Admin">
        <div className="main">
          <BlockAdmin className="users" blockName="Detail">
            <p>Họ và tên: Nguyễn Văn Hoàng</p>
            <p>Mã sinh viên: PH13341</p>
            <p>Chuyên ngành: Thiết kế WEBSITE</p>
            <p>Môn học: WEB502</p>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default UserAdminPage;
