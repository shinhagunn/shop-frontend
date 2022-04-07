import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import List from '~/layouts/category/List';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import ApiClient from '~/library/ApiClient';
import useUserStore from '~/stores/user';
import AddToast from '~/library/Toast';

function UserPage() {
  const userStore = useUserStore();

  const [fullname, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  const handleGender = (e: any) => {
    setGender(e.target.innerHTML);
  };

  const handleUpdate = async () => {
    try {
      await new ApiClient().patch('/api/v2/product/resource/user/profile', {
        fullname,
        gender,
        phone,
        address,
        age,
      });
      AddToast('Success', 'Update user thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Update user không thành công!', 'toast');
      return error;
    }
  };

  const navigation = useNavigate();

  useEffect(() => {
    if (!userStore.logged) {
      navigation('/');
    } else {
      userStore.fetchGetMe().then((res) => {
        if (res) {
          if (res.user_profile.fullname) setFullName(res.user_profile.fullname);
          if (res.user_profile.gender) setGender(res.user_profile.gender);
          if (res.user_profile.phone) setPhone(res.user_profile.phone);
          if (res.user_profile.age) setAge(res.user_profile.age);
          if (res.user_profile.address) setAddress(res.user_profile.address);
        }
      });
    }
  }, []);

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
            <h2 className="text-center uppercase font-bold text-2xl">Thông tin cá nhân</h2>
            <h3 className="text-lg p-2 font-bold">Thông tin chung</h3>
            <Block className="px-2 py-8">
              <BlockItem col={2}>
                Email:
                {' '}
                {userStore.user?.email}
              </BlockItem>
              <BlockItem col={2}>
                Role:
                {' '}
                {userStore.user?.role}
              </BlockItem>
            </Block>
            <h3 className="text-lg p-2 font-bold">Thông tin chi tiết</h3>
            <Block className="px-2 py-4">
              <BlockItem col={0}>
                Tên đầy đủ:
                <br />
                <Input className="border-color rounded outline-none pl-2 p-1 mt-2 w-full" type="text" value={fullname} onChange={(e) => setFullName(e.target.value)} />
              </BlockItem>
              <BlockItem col={4}>
                Tuổi:
                <br />
                <Input className="border-color rounded outline-none pl-2 p-1 mt-2 w-full" type="text" value={age} onChange={(e) => setAge(e.target.value)} />
              </BlockItem>
              <BlockItem col={4}>
                Số điện thoại:
                <br />
                <Input className="border-color rounded outline-none pl-2 p-1 mt-2 w-full" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </BlockItem>
            </Block>
            <Block className="px-2 py-8">
              <BlockItem col={4}>
                Giới tính:
                <br />
                <Select value={gender || 'None'} className="pt-2">
                  <div>
                    <Button className="text-lg w-full text-left py-1 px-2" onClick={(e) => handleGender(e)}>Nam</Button>
                  </div>
                  <div>
                    <Button className="text-lg w-full text-left py-1 px-2" onClick={(e) => handleGender(e)}>Nữ</Button>
                  </div>
                </Select>
              </BlockItem>
              <BlockItem col={0}>
                Địa chỉ:
                <br />
                <Input className="border-color rounded outline-none pl-2 p-1 mt-2 w-full" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </BlockItem>
            </Block>
            <Block className="justify-end">
              <Button className="btn btn-color btn-hover btn-icon mr-5 p-2 rounded text-white w-32" onClick={() => handleUpdate()}>Update</Button>
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
