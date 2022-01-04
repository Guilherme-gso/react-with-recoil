import { atom } from "recoil";

type Product = {
  id: number
  name: string
  price: number
}

const products = atom<Product[]>({ 
  key: 'test_recoil.products',
  default: []
})

export { products }