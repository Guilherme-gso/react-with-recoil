import React, { FormEvent, useState } from 'react'
import { useProduct } from './hooks/useProduct'

export function Products(): JSX.Element {
  const [productData, setProductData] = useState({
    productName: '',
    productPrice: ''
  })

  const { products, deleteProduct, addProduct } = useProduct()

  function onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await addProduct({ 
      name: productData.productName, 
      price: Number(productData.productPrice)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          value={productData.productName} 
          onChange={onChangeInput} 
          name="productName" 
          placeholder="Nome" 
          type="text" 
        />

        <input 
          value={productData.productPrice} 
          onChange={onChangeInput} 
          name="productPrice" 
          placeholder="Preço" 
          type="text" 
        />

        <button type="submit">SUBMIT</button>
      </form>

      {products.map(product => (
        <div key={product.id}>
          <div>
            <strong>Name: {product.name}</strong>
            <br />
            <span>Price: {product.price} R$</span>
          </div>

          <button onClick={() => deleteProduct(product.id)}>Excluir</button>
          <br />
        </div>
      ))}
    </>
  )
}