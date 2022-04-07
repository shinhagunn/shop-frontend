import { useEffect } from 'react';
import Header from '~/layouts/Header';
import Footer from '~/layouts/Footer';
import Slide from '~/layouts/home/Slide';
import Trending from '~/layouts/home/Trending';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import ProductItem from '~/components/ProductItem';
import RegisterEmail from '~/layouts/RegisterEmail';
import usePublicStore from '~/stores/public';

function HomePage() {
  const publicStore = usePublicStore();

  useEffect(() => {
    publicStore.fetchProducts('limit=4');
  }, []);

  return (
    <div>
      <Header target={0} />
      <Slide />
      <Trending />
      <div className="container wide py-12">
        <Block title="Sản phẩm bán chạy">
          {publicStore.products.map((product) => (
            <BlockItem col={4} key={product.id}>
              <ProductItem id={product.id} src={product.image} name={product.name} price={product.price} discount={product.discount} />
            </BlockItem>
          ))}
        </Block>
      </div>
      <Trending />
      <div className="container wide py-12">
        <Block title="Sản phẩm mới nhất">
          {publicStore.products.map((product) => (
            <BlockItem col={4} key={product.id}>
              <ProductItem id={product.id} src={product.image} name={product.name} price={product.price} discount={product.discount} />
            </BlockItem>
          ))}
        </Block>
      </div>

      <RegisterEmail />

      <Footer />
    </div>
  );
}

export default HomePage;
