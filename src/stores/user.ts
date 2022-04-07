import { useNavigate } from 'react-router-dom';
import create from 'zustand';
import ApiClient from '~/library/ApiClient';
import {
  User, CartProductDetail, Order, Chats, Chat,
} from '~/types/index';

type UserStore = {
  user?: User
  cart?: CartProductDetail[]
  logged: boolean
  isReload: boolean
  orders?: Order[]
  order?: Order
  chats: Chats[]
  chat?: Chat

  fetchLogin: (email: string, password: string) => Promise<boolean>
  fetchGetMe: () => Promise<User>
  fetchCartProductDetail: () => Promise<unknown>
  fetchOrders: () => Promise<Order[]>
  fetchOrder: (id: string) => Promise<Order>
  fetchChats: () => Promise<unknown>
  fetchChatByID: (id: string) => Promise<Chat>
  Logout: () => Promise<unknown>
}

const useUserStore = create<UserStore>((set, get) => ({
  user: undefined,
  cart: undefined,
  logged: false,
  isReload: true,
  chats: [],

  fetchLogin: async (email: string, password: string) => {
    try {
      const { data: user } = await new ApiClient().post('/api/v2/myauth/identity/login', {
        email,
        password,
      });

      set({
        ...get(),
        user,
      });
      set({ logged: true, isReload: false });
      return true;
    } catch (error) {
      return false;
    }
  },

  fetchGetMe: async () => {
    try {
      set({ isReload: false });
      const { data: user } = await new ApiClient().get('/api/v2/product/resource/user');

      set({
        ...get(),
        user,
      });

      set({ logged: true, isReload: false });
      return user;
    } catch (error) {
      return error;
    }
  },

  Logout: async () => {
    try {
      await new ApiClient().get('/api/v2/myauth/identity/logout');

      set({ user: undefined, logged: false });
    } catch (error) {
      return error;
    }
  },

  fetchCartProductDetail: async () => {
    try {
      const { data: cart } = await new ApiClient().get('/api/v2/product/resource/user/cart');

      set({
        ...get(),
        cart,
      });
    } catch (error) {
      return error;
    }
  },

  fetchOrders: async () => {
    try {
      const { data: orders } = await new ApiClient().get('/api/v2/product/resource/user/order');

      set({
        ...get(),
        orders,
      });
      return orders;
    } catch (error) {
      return error;
    }
  },

  fetchOrder: async (id: string) => {
    try {
      const { data: order } = await new ApiClient().get(`/api/v2/product/resource/user/order/${id}`);

      set({
        ...get(),
        order,
      });
      return order;
    } catch (error) {
      return error;
    }
  },

  fetchChats: async () => {
    try {
      const { data: chats } = await new ApiClient().get('/api/v2/chat/resource/chat');

      set({
        ...get(),
        chats,
      });
      return chats;
    } catch (error) {
      return error;
    }
  },

  fetchChatByID: async (id: string) => {
    try {
      const { data: chat } = await new ApiClient().get(`/api/v2/chat/resource/chat/${id}`);

      set({
        ...get(),
        chat,
      });
      return chat;
    } catch (error) {
      return error;
    }
  },
}));

export default useUserStore;
