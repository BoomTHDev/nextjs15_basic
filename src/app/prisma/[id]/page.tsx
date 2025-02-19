import { getProduct, getProductUnique } from '@/db/products'

interface PrismaProductIdPageProps {
  params: Promise<{ id: string }>
}

const PrismaProductIdPage = async ({ params }: PrismaProductIdPageProps) => {
  const { id } = await params
  // const product = await getProduct(id)
  const product = await getProductUnique(id)
  
  if (!product) {
    return <div>ไม่พบสินค้า</div>
  }


  return <div>Title: {product.title}</div>
}
export default PrismaProductIdPage
