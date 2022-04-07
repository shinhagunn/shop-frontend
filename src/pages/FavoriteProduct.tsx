import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import Table from '~/components/Table';
import RegisterEmail from '~/layouts/RegisterEmail';
import { Align, Column, Product } from '~/types';

function FavoriteProductPage() {
  const columns: Column[] = [
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
    },
    {
      key: 'price',
      title: 'Price',
      align: Align.Left,
    },
  ];

  const data = [
    {
      id: 1,
      name: 'Product 1',
      price: 234513,
      image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 234513,
      image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 234513,
      image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 234513,
      image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 234513,
      image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
    },
    {
      id: 6,
      name: 'Product 6',
      price: 234513,
      image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
    },
    {
      id: 7,
      name: 'Product 7',
      price: 234513,
      image: 'http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/product-04.png',
    },
  ];

  const scopedSlotsRenderFunc = (item: Product, column: Column) => {
    switch (column.key) {
      case 'image':
        return (
          <img src={item.image} />
        );
    }
  };

  return (
    <>
      <Header target={5} />

      <div className="container wide">
        <Table columns={columns} data={data} is_router_link router_builder="/" scopedSlotsRenderFunc={(item: Product, column) => scopedSlotsRenderFunc(item, column)} />
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default FavoriteProductPage;
