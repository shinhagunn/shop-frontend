export type Slide = {
  id: string
  title: string
  description: string
  image: string
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  category_id: string
  name: string
  price: number
  discount: number
  description: string
  image: string
  status: number
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export type Custommer = {
  id: string
  fullname: string
  email: string
  phone: string
  address: string
  message: string
  created_at: string
  updated_at: string
}

export type Comment = {
  id: string
  user_name: string
  product_id: string
  content: string
  like_count: number
  dislike_count: number
  created_at: string
  updated_at: string
}

export type CartProduct = {
  product_id: string
  quantity: number
}

export type OrderProduct = {
  name: string
  image: string
  price: number
}

export type Order = {
  id: string
  order_product: OrderProduct[]
  status: string
  created_at: string
  updated_at: string
}

export type Message = {
  name: string
  content: string
  created_at: string
}

export type Chat = {
  id: string
  user_id: string[]
  name: string
  messages: Message[]
  code: string
  created_at: string
  updated_at: string
}

export type Chats = {
  id: string
  name: string
}

export type CartProductDetail = {
  product: Product
  quantity: number
}

export type UserProfile = {
  fullname: string
  age: string
  phone: string
  address: string
  gender: string
}

export type User = {
  uid: string
  email: string
  state: string
  role: string
  user_profile: UserProfile
  cart: CartProduct[]
  created_at: string
  updated_at: string
}

export enum Align {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export interface Column {
  key: string
  title?: string
  class?: string
  align?: Align
  scopedSlots?: boolean
  headScopedSlots?: boolean
  isTime?: boolean
  isCurrency?: boolean
}

export enum State {
  Active = 'Active',
  Pending = 'Pending',
  Banned = 'Banned',
  Deleted = 'Deleted'
}

export enum Role {
  Admin = 'Admin',
  Member = 'Member'
}
