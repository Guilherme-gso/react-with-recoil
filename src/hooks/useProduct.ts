import { Product } from "../types/Product";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { apiService, products as productsState } from "../atoms/products"
import { useEffect } from "react";

type ProductData = Omit<Product, 'id'>

type UseProduct = {
  deleteProduct: (productId: number) => Promise<void>
  addProduct: (productData: ProductData) => Promise<void>
  products: Product[]
}

export function useProduct(): UseProduct {
  const api = useRecoilValue(apiService)
  const [products, setProducts] = useRecoilState(productsState)

  const deleteProduct = useRecoilCallback(
    ({ snapshot, set }) => async (productId: number) => {
      const [api, products] = await Promise.all([
        snapshot.getPromise(apiService),
        snapshot.getPromise(productsState),
      ])

      try {
        await api.request({
          url: `products/${productId}`,
          requestMethod: 'DELETE'
        })

        set(productsState, products.filter(product => product.id !== productId))
      } catch (error) {
        throw error
      }
    }, []);

  const addProduct = useRecoilCallback(
    ({ set, snapshot }) => async (productData: ProductData) => {
      const [api, products] = await Promise.all([
        snapshot.getPromise(apiService),
        snapshot.getPromise(productsState),
      ])

      try {
        const data = await api.request({
          url: 'products',
          requestMethod: 'POST',
          options: {
            body: JSON.stringify(productData)
          }
        })

        set(productsState, [...products, data])
      } catch (error) {
        throw error
      }
    },
    []
  )

  useEffect(() => {
    api.request({
      url: 'products', 
      requestMethod: 'GET'
    })
    .then(response => setProducts(response))
    .catch(error => console.log(error))
  }, [api, setProducts])

  return {
    deleteProduct,
    addProduct,
    products,
  }
}