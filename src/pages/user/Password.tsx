import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import List from '~/layouts/category/List';
import useUserStore from '~/stores/user';
import Button from '~/components/Button';
import Input from '~/components/Input';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

function UserPage() {
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [renewpassword, setReNewPassword] = useState('');

  const handleUpdate = async () => {
    try {
      if (newpassword !== renewpassword) {
        AddToast('Error', 'Mật khẩu mới không trùng khớp!', 'toast');
      } else {
        await new ApiClient().patch('/api/v2/myauth/resource/user/update/password', {
          old_password: oldpassword,
          new_password: newpassword,
        });
        AddToast('Success', 'Update password thành công!', 'toast');
      }
    } catch (error) {
      AddToast('Error', 'Update password không thành công!', 'toast');
      return error;
    }
  };

  // useEffect(() => {

  // }, [danhmuc])

  return (
    <>
      <Header target={6} />

      <div className="container wide py-8">
        <Block className="justify-between items-center">
          <BlockItem>
            <Link to="/" className="text-lg text-gray-400 hover:text-gray-600">TRANG CHỦ</Link>
            {' '}
            /
            <span className="font-bold text-lg">{' NGƯỜI DÙNG'}</span>
          </BlockItem>
        </Block>
      </div>

      <div className="container wide pb-12">
        <Block>
          <BlockItem col={4}>
            <List title="danh mục">
              <Link to="/user">Thông tin cá nhân</Link>
              <Link to="/user/password">Đổi mật khẩu</Link>
            </List>
          </BlockItem>
          <BlockItem col={0}>
            <h2 className="text-center uppercase font-bold text-2xl">Thay đổi mật khẩu</h2>
            <Block className="px-2 pt-8 pb-2 justify-center">
              <BlockItem col={3}>
                Mật khẩu cũ:
                <br />
                <Input className="border-color rounded outline-none pl-2 p-1 mt-2 w-full" type="password" autocomplete="off" value={oldpassword} onChange={(e) => setOldPassword(e.target.value)} />
              </BlockItem>
            </Block>
            <Block className="px-2 py-2 justify-center">
              <BlockItem col={3}>
                Mật khẩu mới:
                <br />
                <Input className="border-color rounded outline-none pl-2 p-1 mt-2 w-full" type="password" autocomplete="off" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} />
              </BlockItem>
            </Block>
            <Block className="px-2 py-2 justify-center">
              <BlockItem col={3}>
                Nhập lại mật khẩu mới:
                <br />
                <Input className="border-color rounded outline-none pl-2 p-1 mt-2 w-full" type="password" autocomplete="off" value={renewpassword} onChange={(e) => setReNewPassword(e.target.value)} />
              </BlockItem>
            </Block>
            <Block className="justify-center">
              <BlockItem col={3} className="flex justify-center">
                <Button className="btn btn-color btn-hover btn-icon rounded p-1 mt-4 text-white w-36" onClick={() => handleUpdate()}>Update</Button>
              </BlockItem>
            </Block>
          </BlockItem>
        </Block>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default UserPage;
