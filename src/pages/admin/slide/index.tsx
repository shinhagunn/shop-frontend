import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '~/assets/styles/pages/admin/slide/index.less';
import BlockAdmin from '~/components/BlockAdmin';
import Table from '~/components/Table';
import LayoutAdmin from '~/layouts/LayoutAdmin';
import useAdminStore from '~/stores/admin';
import { Align, Column, Slide } from '~/types/index';

function SlideAdminPage() {
  const AdminStore = useAdminStore();

  useEffect(() => {
    AdminStore.fetchSlides();
  }, []);

  const columns = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,
    },
    {
      key: 'image',
      title: 'Image',
      align: Align.Left,
      scopedSlots: true,
    },
    {
      key: 'title',
      title: 'Title',
      align: Align.Left,
    },
    {
      key: 'description',
      title: 'Description',
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

  const scopedSlotsRenderFunc = (item: Slide, column: Column) => {
    switch (column.key) {
      case 'image':
        return (
          <img className={`${column.key} ${column.class} text-${column.align}`} src={item.image} />
        );
    }
  };

  return (
    <LayoutAdmin selected={5} pageName="Slides">
      <div className="main">
        <BlockAdmin className="slides" blockName="Table Slides">
          <Link to="/admin/slides/add" className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-3 my-2 inline-block text-white rounded w-22">Add slide</Link>
          <Table is_router_link router_builder="/admin/slides" data={AdminStore.slides} columns={columns} scopedSlotsRenderFunc={(item: Slide, column) => scopedSlotsRenderFunc(item, column)} />
        </BlockAdmin>
      </div>
    </LayoutAdmin>
  );
}

export default SlideAdminPage;
