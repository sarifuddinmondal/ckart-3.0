import { supabase } from './supabaseClient'
import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const { data } = await supabase.from('products').select('*')
      if (data) setProducts(data)
    }
    getProducts()
  }, [])

  return (
    <div>
      <h1>CKART-3.0 Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price} TK</li>
        ))}
      </ul>
    </div>
  )
}

export default App