import axios from 'axios'

interface Products {
  'id': string
  'name': string
  'description': string
  'price': number
  'inStock': boolean | React.ChangeEvent<HTMLInputElement>
}

const productsApi = axios.create({
  baseURL: 'http://127.0.0.1:3001/'
})

export const getProducts = async (): Promise<any> => {
  const res = await productsApi.get('/products')
  return res.data
}

export const createProducts = async (product: any): Promise<any> => await productsApi.post('/products', product)

export const deleteProducts = async (id: string): Promise<any> => await productsApi.delete(`/products/${id}`)

export const updateProducts = async (product: Products): Promise<any> => await productsApi.put(`/products/${product.id}`, product)
