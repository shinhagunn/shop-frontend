import create from 'zustand';
import {
  Slide, Product, Category, Comment, User,
} from '~/types/';
import ApiClient from '~/library/ApiClient';
import AddToast from '~/library/Toast';

type AdminStore = {
  slides: Slide[]
  products: Product[]
  product?: Product
  categories: Category[]
  comments: Comment[]
  users: User[]
  user?: User
  slide?: Slide

  fetchSlides: () => Promise<unknown>
  fetchProducts: (query: string) => Promise<unknown>
  fetchProduct: (id: string | undefined) => Promise<unknown>
  fetchCategories: () => Promise<Category[]>
  fetchUsers: () => Promise<unknown>
  fetchUserByUID: (uid: string) => Promise<User>
  fetchProductByID: (id: string) => Promise<Product>
  fetchSlideByID: (id: string) => Promise<Slide>
}

const useAdminStore = create<AdminStore>((set, get) => ({
  slides: [],
  products: [],
  categories: [],
  comments: [],
  users: [],

  fetchSlides: async () => {
    try {
      const { data: slides } = await new ApiClient().get('/api/v2/product/public/slides');

      set({
        ...get(),
        slides,
      });
    } catch (error) {
      return error;
    }
  },

  fetchProducts: async (query: string) => {
    try {
      const { data: products } = await new ApiClient().get(`/api/v2/product/public/products?${query}`);

      set({
        ...get(),
        products,
      });
    } catch (error) {
      return error;
    }
  },

  fetchProduct: async (id: string | undefined) => {
    try {
      const { data: product } = await new ApiClient().get(`/api/v2/product/public/product/${id}`);

      set({
        ...get(),
        product,
      });
    } catch (error) {
      return error;
    }
  },

  fetchCategories: async () => {
    try {
      const { data: categories } = await new ApiClient().get('/api/v2/product/public/categories');

      set({
        ...get(),
        categories,
      });

      return categories;
    } catch (error) {
      return error;
    }
  },

  fetchUsers: async () => {
    try {
      const { data: users } = await new ApiClient().get('/api/v2/myauth/admin/users');

      set({
        ...get(),
        users,
      });
    } catch (error) {
      return error;
    }
  },

  fetchUserByUID: async (uid: string) => {
    try {
      const { data: user } = await new ApiClient().get(`/api/v2/myauth/admin/user/${uid}`);

      set({
        ...get(),
        user,
      });

      return user;
    } catch (error) {
      AddToast('Error', 'Update user lỗi !', 'toast');
      return error;
    }
  },

  fetchProductByID: async (id: string) => {
    try {
      const { data: product } = await new ApiClient().get(`/api/v2/product/public/product/${id}`);

      set({
        ...get(),
        product,
      });

      return product;
    } catch (error) {
      AddToast('Error', 'Lấy dữ liệu product lỗi !', 'toast');
      return error;
    }
  },

  fetchSlideByID: async (id: string) => {
    try {
      const { data: slide } = await new ApiClient().get(`/api/v2/product/admin/slide/${id}`);

      set({
        ...get(),
        slide,
      });

      return slide;
    } catch (error) {
      AddToast('Error', 'Lấy dữ liệu slide lỗi !', 'toast');
      return error;
    }
  },

  sendMessage: async (payload: FormData) => {
    try {
      await new ApiClient().post('/api/v2/public/sendmessage', payload);
    } catch (error) {
      return error;
    }
  },
}));

export default useAdminStore;
