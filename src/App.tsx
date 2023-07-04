import { Product } from './components/Product'
import { ProductForm } from './components/ProductForm'

export const App: React.FC = () => {
  return (
    <>
      <ProductForm />
      <Product />
    </>
  )
}
