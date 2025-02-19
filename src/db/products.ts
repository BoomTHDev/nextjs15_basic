import { prisma } from '@/lib/prisma'

export const getProducts = async () => {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const getProduct = async (id: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id
    }
  })
  return product
}

export const getProductUnique = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })
  return product
}

export const getProductCount = async () => {
  const productCount = await prisma.product.count()
  return productCount
}

export const createProduct = async () => {
  const newProduct = await prisma.product.create({
    data: {
      title: 'New Product',
      price: 100
    }
  })

  console.log(newProduct)
}

export const updateProduct = async () => {
  const updatedProduct = await prisma.product.update({
    where: {
      id: 'baef54ee-bbe4-4cd3-817b-85ef65064522'
    },
    data: {
      title: 'Updated Product',
      price: 200
    }
  })

  console.log(updatedProduct)
}

export const removeProduct = async () => {
  const removedProduct = await prisma.product.delete({
    where: {
      id: 'ebe0eee4-2b02-48ce-9e05-e53034f451b3'
    }
  })

  console.log(removedProduct)
}

export const getProductPriceLte = async () => {
  const product = await prisma.product.findMany({
    where: {
      price: {
        lte: 500 // <= 500
      }
    }
  })

  console.log(product)
}

export const getProductPriceGte = async () => {
  const product = await prisma.product.findMany({
    where: {
      price: {
        gte: 500 // >= 500
      }
    }
  })

  console.log(product)
}

export const getProductByPrice = async () => {
  const products = await prisma.product.findMany({
    where: {
      price: {
        lte: 400, // <= 400
        gte: 200, // >= 200
      }
    }
  })

  console.log(products)
}