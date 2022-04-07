/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import '~/assets/styles/pages/login.less';
import useUserStore from '~/stores/user';
import AddToast from '~/library/Toast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userStore = useUserStore();

  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (await userStore.fetchLogin(email, password)) {
      AddToast('Success', 'Đăng nhập thành công', 'toast');
      userStore.fetchGetMe();
      navigate('/');
    } else {
      AddToast('Error', 'Tài khoản hoặc mật khẩu không đúng!', 'toast');
    }
  };

  return (
    <>
      <Header target={6} />

      <div className="container wide py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Đăng nhập vào tài khoản</h2>
        <form action="" className="flex flex-col items-center">
          <div className="form-block">
            <label>Email: </label>
            {' '}
            <br />
            <Input placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-block">
            <label>Password: </label>
            {' '}
            <br />
            <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-block">
            <Button type="submit" onClick={(e) => handleLogin(e)} className="btn btn-color btn-hover w-full text-white text-lg py-1 mt-4">Đăng nhập</Button>
          </div>
        </form>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default LoginPage;
