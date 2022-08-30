import { Injectable } from '@nestjs/common'
import slugify from 'slugify'

import { CreateParams } from '~protocols/products.protocol'
import { PrismaService } from '~database/prisma/prisma.service'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAll() {
    return this.prisma.product.findMany()
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: CreateParams) {
    const { title } = data

    const slug = slugify(title, {
      lower: true,
    })

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    })

    if (productWithSameSlug)
      throw new Error('Another product with same slug already exists.')

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    })
  }
}
