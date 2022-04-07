import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import ProductItem from '~/components/ProductItem';
import List from '~/layouts/category/List';
import usePublicStore from '~/stores/public';
import { removeVietnameseTones } from '~/mixins/helper';
import Select from '~/components/Select';
import Button from '~/components/Button';

function SearchPage() {
  const publicStore = usePublicStore();

  const [sortName, setSortName] = useState('Thứ tự mặc định');

  const handleSort = (query: string, name: string) => {
    publicStore.fetchProducts(query);
    setSortName(name);
  };

  const value = new URLSearchParams(window.location.search).get('value');

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('value');
    publicStore.fetchCategories();
    publicStore.fetchProducts(`name=${value}`);
  }, [publicStore.products]);

  return (
    <>
      <Header target={6} />

      <div className="container wide py-8">
        <Block className="justify-between items-center">
          <BlockItem>
            <Link to="/" className="text-lg text-gray-400 hover:text-gray-600">TRANG CHỦ</Link>
            {' '}
            /
            <span className="font-bold text-lg">{` Kết quả tìm kiếm cho "${value}"`}</span>
          </BlockItem>
          <BlockItem className="flex items-center">
            <span className="mr-4">Hiển thị một kết quả duy nhất</span>
            <Select value={sortName}>
              <div>
                <Button className="text-lg w-full text-left" onClick={() => handleSort('', 'Thứ tự mặc định')}>Thứ tự mặc định</Button>
              </div>
              <div>
                <Button className="text-lg w-full text-left" onClick={() => handleSort('orderby=name&order=asc', 'A-Z')}>A-Z</Button>
              </div>
              <div>
                <Button className="text-lg w-full text-left" onClick={() => handleSort('orderby=name&order=desc', 'Z-A')}>Z-A</Button>
              </div>
              <div>
                <Button className="text-lg w-full text-left" onClick={() => handleSort('orderby=price&order=asc', 'Giá từ thấp tới cao')}>Giá từ thấp tới cao</Button>
              </div>
              <div>
                <Button className="text-lg w-full text-left" onClick={() => handleSort('orderby=price&order=desc', 'Giá từ cao tới thấp')}>Giá từ cao tới thấp</Button>
              </div>
            </Select>
          </BlockItem>
        </Block>
      </div>

      <div className="container wide pb-12">
        <Block>
          <BlockItem col={4}>
            <List title="danh mục sản phẩm">
              {publicStore.categories.map((category) => (
                <Link key={category.id} to={`/danh-muc/${removeVietnameseTones(category.name)}`}>{category.name}</Link>
              ))}
            </List>
          </BlockItem>
          <BlockItem col={0} className="flex flex-wrap">
            {publicStore.products.map((product) => (
              <BlockItem col={4} key={product.id}>
                <ProductItem id={product.id} src={product.image} name={product.name} price={product.price} discount={product.discount} />
              </BlockItem>
            ))}
          </BlockItem>
        </Block>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default SearchPage;
