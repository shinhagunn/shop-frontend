import { useEffect, useState } from 'react';
import '~/assets/styles/pages/cart.less';
import Block from '~/components/Block';
import BlockItem from '~/components/BlockItem';
import Button from '~/components/Button';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import RegisterEmail from '~/layouts/RegisterEmail';
import useUserStore from '~/stores/user';
import '~/assets/styles/pages/user/cart.less';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';
import Input from '~/components/Input';

function ChatPage() {
  const userStore = useUserStore();

  const [message, setMessage] = useState('');
  const [text, setText] = useState('');
  const [client, setClient] = useState<WebSocket>();
  const [loading, setLoading] = useState(false);
  const [roomLoading, setRoomLoading] = useState(false);

  const positionMessage = (name: string) => (name === userStore.user?.user_profile.fullname ? 'text-right' : 'text-left');

  const handleAddMessageFromWebsocket = (text: string) => {
    setLoading(false);
    const name = text.slice(0, text.indexOf(':'));
    const message = text.slice(text.indexOf(':') + 1);
    const mess = document.createElement('div');
    mess.classList.add('py-2');
    mess.classList.add(positionMessage(name));
    mess.innerHTML = `
      <div>${name}</div>
      <div class="border-2 border-sky-500 px-4 py-1 inline-block rounded-lg text-white bg-sky-500 overflow-hidden">
        ${message}
      </div>
    `;

    const element = document.getElementById('chatboard');
    if (element) {
      element.appendChild(mess);
      element.scrollTop = element.scrollHeight;
    }
  };

  const handleAddMessage = async (id: string) => {
    try {
      if (userStore.user?.user_profile) {
        setLoading(true);
        await new ApiClient().post(`/api/v2/chat/resource/chat/${id}/add`, { name: userStore.user.user_profile.fullname, content: message });
        if (client) {
          client.send(`${userStore.user.user_profile.fullname}: ${message}`);
        }
        setMessage('');
      } else {
        AddToast('Error', 'Không lấy được thông tin của bạn!', 'toast');
      }
    } catch (error) {
      return error;
    }
  };

  const showChat = (id: string) => {
    client?.close();
    userStore.chat = undefined;
    setRoomLoading(true);
    userStore.fetchChatByID(id).then((res) => {
      if (res) {
        const element = document.getElementById('chatboard');
        if (element) {
          element.scrollTop = element.scrollHeight;
        }
      }
    });

    setClient(new WebSocket(`ws://localhost:3000/api/v2/websocket/chat/${id}?uid=${userStore.user?.uid}`));
  };

  const handleJoinChatRoom = async () => {
    try {
      await new ApiClient().post('/api/v2/chat/resource/chat/join', { code: text });
      AddToast('Success', 'Tham gia phòng chat thành công!', 'toast');
      userStore.fetchChats();
    } catch (error) {
      AddToast('Error', 'Tham gia phòng chat không thành công!', 'toast');
      return error;
    }
  };

  const handleCreateChatRoom = async () => {
    try {
      await new ApiClient().post('/api/v2/chat/resource/chat/create', { name: text });
      AddToast('Success', 'Tạo phòng chat thành công!', 'toast');
      userStore.fetchChats();
    } catch (error) {
      AddToast('Error', 'Tạo phòng chat không thành công!', 'toast');
      return error;
    }
  };

  useEffect(() => {
    userStore.fetchChats();

    const element = document.getElementById('chatboard');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }

    if (client) {
      client.onopen = (event) => {
        console.log('Connection success');
      };
      client.onclose = (event) => {
        console.log('Connection closed');
      };
      client.onmessage = (event) => {
        if (event.data !== 'ping') {
          handleAddMessageFromWebsocket(event.data);
        }
      };
    }
  }, [client]);

  return (
    <>
      <Header target={6} />

      <div className="container wide">
        <h2 className="text-center font-bold py-8 text-2xl">CHAT ROOM</h2>
        <Block>
          <BlockItem col={4} className="h-96 border-r-2">
            <div className="flex items-center justify-between mb-4">
              <Button className="border-color flex rounded-full justify-center items-center h-8 w-10 bg-slate-200 hover:bg-slate-300" onClick={() => handleCreateChatRoom()}>
                <i className="fa-solid fa-plus text-right text-lg m-0" />
              </Button>
              <Button className="ml-2 border-color flex rounded-full justify-center items-center h-8 w-10 bg-slate-200 hover:bg-slate-300" onClick={() => handleJoinChatRoom()}>
                <i className="fa-solid fa-arrow-right-to-bracket text-right text-lg m-0" />
              </Button>
              <Input className="border-color rounded focus:outline-none h-8 w-full ml-2 pl-2" type="text" placeholder="Nhập code ..." value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            {userStore.chats ? userStore.chats.map((chat) => (
              <Button className="block hover:bg-slate-200 text-lg w-full border-color py-4 pl-2 text-left" onClick={() => showChat(chat.id)}>
                {chat.name}
              </Button>
            )) : 'Chưa có đoạn hội thoại nào'}
          </BlockItem>
          <BlockItem col={0}>
            {userStore.chat ? (
              <div className="border-2 rounded-lg">
                <div className="chat-header flex justify-between items-center border-b-2 p-2 h-12 rounded-tl rounded-tr">
                  <span className="font-bold">{userStore.chat.name}</span>
                  <span className="font-bold">{userStore.chat.code}</span>
                </div>
                <div id="chatboard" className="h-96 p-2 flex flex-col overflow-y-auto">
                  {userStore.chat.messages ? (
                    userStore.chat.messages.map((message) => (
                      <div className={`py-2 ${positionMessage(message.name)}`}>
                        <div>{message.name}</div>
                        <div className="border-2 border-sky-500 px-4 py-1 inline-block rounded-lg text-white bg-sky-500 overflow-hidden">
                          {message.content}
                        </div>
                      </div>
                    ))
                  ) : ''}
                </div>
                <div className="flex">
                  <BlockItem col={0}>
                    <Input className="border-2 w-full m-1 rounded-lg h-10 pl-2 focus:outline-none" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </BlockItem>
                  <BlockItem>
                    <Button className="border-2 border-sky-500 w-full m-1 rounded-lg text-lg px-3 h-10 text-white bg-sky-500" onClick={() => handleAddMessage(userStore.chat ? userStore.chat.id : '')}>
                      Gửi
                    </Button>
                  </BlockItem>
                  <BlockItem className="flex justify-center items-center">
                    {loading ? (
                      <div className="lds-ring">
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    ) : (
                      <div className="w-6 h-6" />
                    )}
                  </BlockItem>
                </div>
              </div>
            ) : (
              <div className="w-ful h-full flex justify-center items-center text-slate-400 text-2xl">
                {roomLoading ? (
                  <div className="lds-ring h-96">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                ) : 'NONE'}
              </div>
            )}
          </BlockItem>
        </Block>
      </div>

      <RegisterEmail />

      <Footer />
    </>
  );
}

export default ChatPage;
