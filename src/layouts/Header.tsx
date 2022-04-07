import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '~/assets/images/logo.png';
import '~/assets/styles/components/button.less';
import '~/assets/styles/layouts/header.less';
import Button from '~/components/Button';
import Input from '~/components/Input';
import useUserStore from '~/stores/user';

interface HeaderProps {
  target: number;
}

function Header(props: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  const userStore = useUserStore();
  const navigation = useNavigate();

  const handleLogout = () => {
    userStore.Logout();
    navigation('/');
  };

  useEffect(() => {
    if (userStore.isReload) {
      userStore.fetchGetMe();
    }
  }, [searchValue]);

  return (
    <div className="header bg-stone-700">
      <div className="header-top container wide text-white p-2 flex items-center justify-between">
        <div className="header-top-left flex">
          <div>
            <i className="fa-solid fa-location-dot" />
            <span className="text-sm ml-2">51 Nguyễn Hoàng, Nam Từ Liêm, Hà Nội</span>
          </div>
          <div className="ml-4">
            <i className="fa-solid fa-phone" />
            <a href="tel:+0386498785" className="text-sm ml-2 text-hover">038.649.8785</a>
          </div>
        </div>
        <div className="header-top-right">
          {userStore.user ? (
            <div>
              {userStore.user.role === 'Admin' ? (
                <Link to="/dashboard/users" className="text-hover text-sm mr-4">Admin</Link>
              ) : '' }
              <Link to="/user" className="text-hover text-sm mr-4">
                Xin chào,
                {userStore.user.email}
              </Link>
              <Button className="text-hover text-sm" onClick={() => handleLogout()}>Logout</Button>
            </div>
          ) : (
            <div>
              <Link to="/dang-nhap" className="text-hover text-sm mr-4">Đăng nhập</Link>
              <Link to="/dang-ky" className="text-hover text-sm">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>

      <hr className="border-1 border-neutral-600" />

      <div className="header-middle container wide py-5 flex justify-between items-center text-white">
        <div className="header-logo">
          <Link to="/" className={props.target === 0 ? 'target' : ''}>
            <img className="w-52" src={logo} />
          </Link>
        </div>
        <div className="header-search">
          <Input placeholder="Tìm kiếm" type="text" onChange={(e) => setSearchValue(e.target.value)} />
          <Button className="btn-color btn-icon btn-hover">
            <Link to={`/tim-kiem?value=${searchValue}`}><i className="fa-solid fa-magnifying-glass" /></Link>
          </Button>
        </div>
        <div className="header-cart">
          {userStore.logged ? (
            <div>
              {userStore.user?.role === 'Collaborators' || userStore.user?.role === 'Admin' ? (
                <Link to="/user/chats">
                  <i className="fa-solid fa-comment text-3xl ml-6 text-hover" />
                </Link>
              ) : ''}
              <Link to="/user/orders">
                <i className="fa-solid fa-book text-3xl ml-6 text-hover" />
              </Link>
              <Link to="/user/cart">
                <i className="fa-solid fa-bag-shopping text-3xl ml-6 text-hover" />
              </Link>
            </div>
          ) : ''}
        </div>
      </div>

      <hr className="border-1 border-neutral-600" />

      <div className="header-menu container wide text-white">
        <Link to="/" className={props.target === 0 ? 'target' : ''}>
          Trang chủ
        </Link>
        <Link to="/gioi-thieu" className={props.target === 1 ? 'target' : ''}>
          Giới thiệu
        </Link>
        <Link to="/danh-muc/" className={props.target === 2 ? 'target' : ''}>
          Danh mục
        </Link>
        <Link to="/lien-he" className={props.target === 3 ? 'target' : ''}>
          Liên hệ
        </Link>
      </div>
    </div>
  );
}

export default Header;
