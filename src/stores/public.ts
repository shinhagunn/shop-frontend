import create from 'zustand';
import {
  Slide, Product, Category, Comment, User,
} from '~/types/';
import ApiClient from '~/library/ApiClient';

type PublicStore = {
  slides: Slide[]
  products: Product[]
  product: Product
  categories: Category[]
  comments?: Comment[]
  user?: User

  fetchSlides: () => Promise<unknown>
  fetchUserByID: (id: string | undefined) => Promise<unknown>
  fetchProducts: (query: string) => Promise<unknown>
  fetchProduct: (id: string | undefined) => Promise<unknown>
  fetchCategories: () => Promise<unknown>
  sendMessage: (payload: FormData) => Promise<unknown>
  fetchGetAllCommentInProduct: (id: string | undefined) => Promise<unknown>
}

const usePublicStore = create<PublicStore>((set, get) => ({
  slides: [],
  products: [],
  product: {
    id: '',
    category_id: '',
    name: '',
    price: 0,
    discount: 0,
    description: '',
    image: '',
    created_at: '',
    updated_at: '',
  },
  categories: [],

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
    } catch (error) {
      return error;
    }
  },

  fetchGetAllCommentInProduct: async (id: string | undefined) => {
    try {
      const { data: comments } = await new ApiClient().get(`/api/v2/product/public/product/${id}/comments`);

      set({
        ...get(),
        comments,
      });
    } catch (error) {
      return error;
    }
  },

  fetchUserByID: async (id: string | undefined) => {
    try {
      const { data: user } = await new ApiClient().get(`/api/v2/product/public/user/${id}`);

      set({
        ...get(),
        user,
      });
    } catch (error) {
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

export default usePublicStore;
