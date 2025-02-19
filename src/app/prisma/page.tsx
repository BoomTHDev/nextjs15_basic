import { getProductCount, getProducts } from '@/db/products'
import Link from 'next/link'

const PrismaPage = async () => {
  const products = await getProducts()
  const productCount = await getProductCount()

  return (
    <div>
      Product Total: {productCount}
      {products.map((product) => (
        <div key={product.id}>
          <h1>Title: {product.title}</h1>
          <p>Price: {product.price}</p>
          <Link href={`/prisma/${product.id}`}>See detail</Link>
        </div>
      ))}
    </div>
  )
}
export default PrismaPage
