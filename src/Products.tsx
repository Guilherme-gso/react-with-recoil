import { products } from './atoms/products'
import { useFetch } from './hooks/useFecth'

type Product = {
  id: number;
  name: string;
  price: number
}

export function Products(): JSX.Element {
  const { data } = useFetch<Product[]>(products)

  return (
    <>
      {data.map(product => (
        <div key={product.id}>
          <span>Name: {product.name}</span>
          <small>Price: {product.price}</small>
        </div>
      ))}
    </>
  )
}