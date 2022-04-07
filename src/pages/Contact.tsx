import { useState } from 'react';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Input from '~/components/Input';
import Button from '~/components/Button';
import RegisterEmail from '~/layouts/RegisterEmail';
import usePublicStore from '~/stores/public';

function ContactPage() {
  const publicStore = usePublicStore();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('fullname', fullname);
    payload.append('email', email);
    payload.append('phone', phone);
    payload.append('address', address);
    payload.append('message', message);

    publicStore.sendMessage(payload);

    alert('Bạn đã gửi tin nhắn thành công !');
  };

  return (
    <>
      <Header target={3} />

      <div className="container wide py-16">
        <iframe className="w-full" title="a" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.015662796538!2d105.77136121493265!3d21.03205928599658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b12b15dbbd%3A0x95156bc7b3091b9f!2zNTEgUC4gTmd1eeG7hW4gSG_DoG5nLCBN4bu5IMSQw6xuaCwgVOG7qyBMacOqbSwgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1648214559389!5m2!1svi!2s" width="600" height="450" loading="lazy" />
      </div>

      <div className="container wide pt-2 pb-16">
        <Block>
          <BlockItem col={3}>
            <div className="flex">
              <div className="img text-3xl text-color mr-2">
                <i className="fa-solid fa-location-pin" />
              </div>
              <div className="text">
                <h4 className="title font-bold text-xl pb-2">Địa chỉ:</h4>
                <p>51 Nguyễn Hoàng, Nam Từ Liêm, Hà Nội</p>
              </div>
            </div>
          </BlockItem>
          <BlockItem col={3}>
            <div className="flex">
              <div className="img text-3xl text-color mr-2">
                <i className="fa-solid fa-phone" />
              </div>
              <div className="text">
                <h4 className="title font-bold text-xl pb-2">Điện thoại:</h4>
                <a href="tel:+386498785" className="text-hover">0386498785</a>
                <p>Bấm 109 – Phòng kinh doanh</p>
                <p>Bấm 103 – Phòng kỹ thuật</p>
              </div>
            </div>
          </BlockItem>
          <BlockItem col={3}>
            <div className="flex">
              <div className="img text-3xl text-color mr-2">
                <i className="fa-solid fa-envelope" />
              </div>
              <div className="text">
                <h4 className="title font-bold text-xl pb-2">Địa chỉ:</h4>
                <a href="mailto:demonhunterg@gmail.com" className="text-hover">shinhagunn@gmail.com</a>
                {' '}
                <br />
              </div>
            </div>
          </BlockItem>
        </Block>
      </div>

      <div className="container form">
        <Block className="justify-center">
          <BlockItem col={2}>
            <Input className="w-full h-10 pl-4 outline-none mb-4" type="text" placeholder="Họ và tên" onChange={(e) => setFullname(e.target.value)} />
          </BlockItem>
          <BlockItem col={2}>
            <Input className="w-full h-10 pl-4 outline-none mb-4" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </BlockItem>
          <BlockItem col={2}>
            <Input className="w-full h-10 pl-4 outline-none mb-4" type="text" placeholder="Số điện thoại" onChange={(e) => setPhone(e.target.value)} />
          </BlockItem>
          <BlockItem col={2}>
            <Input className="w-full h-10 pl-4 outline-none mb-4" type="text" placeholder="Địa chỉ" onChange={(e) => setAddress(e.target.value)} />
          </BlockItem>
          <BlockItem col={1}>
            <textarea className="w-full pl-4 outline-none pt-2 h-32" placeholder="Lời nhắn" onChange={(e) => setMessage(e.target.value)} />
          </BlockItem>
          <Button className="btn btn-hover btn-color text-lg w-96 py-1 font-bold text-white mt-2 mb-16" onClick={(e) => sendMessage(e)}>GỬI</Button>
        </Block>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default ContactPage;
