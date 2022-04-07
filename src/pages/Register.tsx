import { useState } from 'react';
import Input from '~/components/Input';
import Button from '~/components/Button';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
// import "~/assets/styles/pages/register.less"

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Header target={6} />

      <div className="container wide py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Đăng ký vào tài khoản</h2>
        <form action="" className="flex flex-col items-center">
          <div className="form-block">
            <label>Email: </label>
            {' '}
            <br />
            <Input placeholder="Email" type="text" />
          </div>
          <div className="form-block">
            <label>Password: </label>
            {' '}
            <br />
            <Input placeholder="Password" type="password" />
          </div>
          <div className="form-block">
            <label>Re-Password: </label>
            {' '}
            <br />
            <Input placeholder="Re-Password" type="password" />
          </div>
          <div className="form-block">
            <Button type="submit" className="btn btn-color btn-hover w-full text-white text-lg py-1 mt-4">Đăng nhập</Button>
          </div>
        </form>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default RegisterPage;
