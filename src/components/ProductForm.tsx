import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProducts } from '../api/productApi'

export const ProductForm: React.FC = () => {
  const queryClient: any = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      console.log('Producto agregado')
      queryClient.invalidateQueries('products')
    }
  })

  const handleSubmit = (event: any): void => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const product = Object.fromEntries(formData)
    console.log(product)
    addProductMutation.mutate({
      ...product,
      inStock: true
    })
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" />

        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" />

        <button>
            Add Product
        </button>
    </form>
    </>
  )
}
