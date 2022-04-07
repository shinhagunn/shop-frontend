import Header from '~/layouts/Header';
import Footer from '~/layouts/Footer';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import InfoNumber from '~/layouts/about/InfoNumber';
import RegisterEmail from '~/layouts/RegisterEmail';

function AboutPage() {
  return (
    <div className="about">
      <Header target={1} />

      <div className="container wide py-12">
        <Block className="items-center">
          <BlockItem col={2}>
            <img src="src/assets/images/about.jpg" />
          </BlockItem>
          <BlockItem col={2}>
            <h3 className="text-4xl font-bold pb-6">Giới thiệu về Smart Shin</h3>
            <p>“Cùng với sự phát triển không ngừng của thời trang thế giới, rất nhiều thương hiệu cho ra đời những mẫu điện thoại chính hãng đa dạng về phong cách, kiểu dáng, màu sắc, kích cỡ… Một chiếc điện thoại cao cấp chính hãng khắc họa một giá trị đích thực khi nói đến phụ kiện xa xỉ dành cho phái mạnh. Hiện nay, điện thoại là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay.”</p>
          </BlockItem>
        </Block>
      </div>

      <div className="container wide pt-12">
        <Block>
          <BlockItem col={3}>
            <div className="flex">
              <div className="image">
                <i className="fa-solid fa-clock text-5xl" />
              </div>
              <div className="text ml-2">
                <h4 className="title pb-2 font-bold text-xl">Hàng chính hãng</h4>
                <p>Hiện nay, điện thoại là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
              </div>
            </div>
          </BlockItem>
          <BlockItem col={3}>
            <div className="flex">
              <div className="image">
                <i className="fa-solid fa-newspaper text-5xl" />
              </div>
              <div className="text ml-2">
                <h4 className="title pb-2 font-bold text-xl">Sản phẩm mới 100%</h4>
                <p>Hiện nay, điện thoại là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
              </div>
            </div>
          </BlockItem>
          <BlockItem col={3}>
            <div className="flex">
              <div className="image">
                <i className="fa-solid fa-shield text-5xl" />
              </div>
              <div className="text ml-2">
                <h4 className="title pb-2 font-bold text-xl">Bảo hành 12 tháng</h4>
                <p>Hiện nay, điện thoại là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
              </div>
            </div>
          </BlockItem>
        </Block>
      </div>

      <div className="container wide pt-4 pb-16">
        <Block>
          <BlockItem col={3}>
            <div className="flex">
              <div className="image">
                <i className="fa-solid fa-clock text-5xl" />
              </div>
              <div className="text ml-2">
                <h4 className="title pb-2 font-bold text-xl">Đổi trả trong vòng 7 ngày</h4>
                <p>Hiện nay, điện thoại là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
              </div>
            </div>
          </BlockItem>
          <BlockItem col={3}>
            <div className="flex">
              <div className="image">
                <i className="fa-solid fa-ship text-5xl" />
              </div>
              <div className="text ml-2">
                <h4 className="title pb-2 font-bold text-xl">Miễn phí giao hàng</h4>
                <p>Hiện nay, điện thoại là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
              </div>
            </div>
          </BlockItem>
          <BlockItem col={3}>
            <div className="flex">
              <div className="image">
                <i className="fa-solid fa-hand-holding-dollar text-5xl" />
              </div>
              <div className="text ml-2">
                <h4 className="title pb-2 font-bold text-xl">Giá cả hợp lý</h4>
                <p>Hiện nay, điện thoại là phụ kiện thời trang thiết yếu đối với những người đàn ông hiện đại ngày nay</p>
              </div>
            </div>
          </BlockItem>
        </Block>
      </div>

      <InfoNumber />

      <RegisterEmail />

      <Footer />
    </div>
  );
}

export default AboutPage;
