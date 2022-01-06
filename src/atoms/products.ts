import { api } from "../services";
import { atom } from "recoil";
import { Product } from '../types/Product'

const apiService = atom({
  key: 'API_SERVICE',
  default: api,
})

const products = atom<Product[]>({
  key: 'FETCH_PRODUCTS',
  default: []
})

export { products, apiService }