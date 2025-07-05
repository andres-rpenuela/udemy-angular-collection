import {Gender, Product} from '@products/interfaces/product.interface';
import {User} from '@auth/interfaces/user.interface';

export const productEmpty:Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  tags: [],
  images: [],
  sizes: [],
  gender: Gender.Unisex,
  user: {} as User
}
