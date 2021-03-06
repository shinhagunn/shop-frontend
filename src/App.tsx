import './App.css';
import './index.less';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from '~/pages/Home';
import AboutPage from '~/pages/About';
import CategoryPage from '~/pages/Category';
import ContactPage from '~/pages/Contact';
import ProductDetailPage from '~/pages/ProductDetail';
import FavoriteProductPage from '~/pages/FavoriteProduct';
import SearchPage from '~/pages/Search';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProductAdminPage from './pages/admin/product';
import CategoryAdminPage from './pages/admin/category';
import SlideAdminPage from './pages/admin/slide';
import UserAdminPage from './pages/admin/user';
import UserPage from '~/pages/user/index';
import UserPasswordPage from '~/pages/user/Password';
import UserCartPage from '~/pages/user/Cart';
import UserOrderPage from '~/pages/user/Order';
import ChatPage from '~/pages/user/Chat';
import UserOrderDetailPage from '~/pages/user/OrderDetail';
import ProductDetailAdminPage from '~/pages/admin/product/detail';
import SlideDetailAdminPage from '~/pages/admin/slide/detail';
import ProductAddAdminPage from '~/pages/admin/product/add';
import SlideAddAdminPage from '~/pages/admin/slide/add';
import UserDetailAdminPage from '~/pages/admin/user/detail';
import ToastContainer from './components/Toast';
import AdminPage from '~/pages/admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/danh-muc" element={<CategoryPage />}>
          <Route path=":danhmuc" element={<CategoryPage />} />
        </Route>
        <Route path="/san-pham">
          <Route path=":id" element={<ProductDetailPage />} />
        </Route>
        <Route path="/tim-kiem" element={<SearchPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/products/favorite" element={<FavoriteProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin">
          <Route path="products" element={<ProductAdminPage />} />
          <Route path="categories" element={<CategoryAdminPage />} />
          <Route path="slides" element={<SlideAdminPage />} />
          <Route path="users" element={<UserAdminPage />} />
          <Route path="products">
            <Route path=":id" element={<ProductDetailAdminPage />} />
          </Route>
          <Route path="slides">
            <Route path=":id" element={<SlideDetailAdminPage />} />
          </Route>
          <Route path="products/add" element={<ProductAddAdminPage />} />
          <Route path="slides/add" element={<SlideAddAdminPage />} />
          <Route path="users">
            <Route path=":uid" element={<UserDetailAdminPage />} />
          </Route>
        </Route>
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/password" element={<UserPasswordPage />} />
        <Route path="/user/cart" element={<UserCartPage />} />
        <Route path="/user/orders" element={<UserOrderPage />} />
        <Route path="/user/order/:urlID" element={<UserOrderDetailPage />} />
        <Route path="/user/chats" element={<ChatPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
