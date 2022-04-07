import '~/assets/styles/layouts/footer.less';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top container wide py-16">
        <Block>
          <BlockItem col={4}>
            <p className="block-title font-bold uppercase pb-4">Thông tin liên hệ</p>
            <ul className="text-sm">
              <li>
                <a href="#">
                  <i className="fa-solid fa-location-pin" />
                  51 Nguyễn Hoàng, Nam Từ Liêm, Hà Nội
                </a>

              </li>
              <li>
                <a className="text-hover" href="#">
                  <i className="fa-solid fa-phone" />
                  0386498785
                </a>

              </li>
              <li>
                <a className="text-hover" href="#">
                  <i className="fa-solid fa-envelope" />
                  shinhagunn@gmail.com
                </a>

              </li>
              <li>
                <a className="text-hover" href="#">
                  <i className="fa-brands fa-skype" />
                  shinhagunn
                </a>

              </li>
            </ul>
          </BlockItem>
          <BlockItem col={4}>
            <p className="block-title font-bold uppercase pb-4">Liên hệ</p>
            <ul className="text-sm">
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Đồng hồ nam</a></li>
              <li><a href="#">Đồng hồ nữ</a></li>
              <li><a href="#">Blogs</a></li>
              <li><a href="#">Liên hệ</a></li>
            </ul>
          </BlockItem>
          <BlockItem col={4}>
            <p className="block-title font-bold uppercase pb-4">Hỗ trợ</p>
            <ul className="text-sm">
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Hướng dẫn thanh toán</a></li>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Tư vấn khách hàng</a></li>
            </ul>
          </BlockItem>
          <BlockItem col={4}>
            <p className="block-title font-bold uppercase pb-4">Hỗ trợ</p>
            <ul className="text-sm">
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Hướng dẫn thanh toán</a></li>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Tư vấn khách hàng</a></li>
            </ul>
          </BlockItem>
        </Block>
      </div>

      <hr className="border-1 border-neutral-600" />

      <div className="footer-author container wide py-8 text-center">
        NGUYỄN VĂN HOÀNG - PH13341
      </div>
    </div>
  );
}

export default Footer;
