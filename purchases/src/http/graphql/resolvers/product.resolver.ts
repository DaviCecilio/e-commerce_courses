import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ProductsService } from '~services/products.service'

import { AuthorizationGuard } from '~http/auth/authorization.guard'
import Product from '~http/graphql/models/product.model'
import { CreateProductInput } from '~http/graphql/inputs/products.input'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAll()
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.create(data)
  }
}
