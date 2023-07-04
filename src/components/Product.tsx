import { deleteProducts, getProducts, updateProducts } from '../api/productApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface Products {
  'id': string
  'name': string
  'description': string
  'price': number
  'inStock': boolean
}

export const Product: React.FC = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    select: products => products.sort((a: any, b: any) => b.id - a.id)
  })

  const queryClient: any = useQueryClient()

  const deleteProductMutation = useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => { queryClient.invalidateQueries('products') }
  })
  const products: (Products | undefined | string | any) = data

  const updateProductMutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })

  console.log(isLoading, isError, error, products)

  return (
    <>
    {products?.map((product: Products) => (
      <div key={product.id}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button onClick={() => {
          deleteProductMutation.mutate(product.id)
        }}>Delete</button>
        <input type="checkbox" id={product.id} checked={product.inStock} onChange={(e): void => {
          updateProductMutation.mutate({
            ...product,
            inStock: e.target.checked
          })
        }} />
        <label htmlFor={product.id}>In Stock</label>
      </div>
    ))}
    </>
  )
}
