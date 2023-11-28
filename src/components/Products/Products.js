import React, { useCallback, useReducer } from 'react'

import ProductForm from './ProductForm'
import ProductList from './ProductList'
import Search from './Search'


const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.products
    case 'ADD':
      return [...state, action.product]
    default:
      throw new Error('Error')
  }
}


const Products = () => {
  // const [products, setProducts] = useState([])

  const [products, dispath] = useReducer(productReducer, [])

  const searchProductsHandler = useCallback((items) => {
    // setProducts(items)

    dispath({ type: 'SET', products: items })
  }, [])


  const addProductHandler = (item) => {
    fetch('https://test22-d8e86-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      response.json().then((responseData) => {
          // setProducts((prevState) => {
          //   return [
          //     ...prevState, 
          //     {
          //       id: responseData.name,
          //       ...item,
          //     },
          //   ]
          // })

          dispath({
            type: 'ADD',
            product: { id:responseData.name, ...item },
          })

        })
    })

  }



  return (
    <div className="App">
      <ProductForm onAddProduct={addProductHandler} />

      <section>
        <Search onLoadProducts={searchProductsHandler} />
        <ProductList products={products} onRemoveItem={() => {}} />
      </section>
    </div>
  )
}


export default Products

