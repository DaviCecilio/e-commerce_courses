import { UseGuards } from '@nestjs/common'
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql'

import { AuthorizationGuard } from '~http/auth/authorization.guard'
import { AuthUser, CurrentUser } from '~http/auth/current-user'
import { Purchase } from '~http/graphql/models/purchase.model'
import {
  ProductsService,
  PurchasesService,
  CustomersService,
} from '~services/index'
import { CreatePurchaseInput } from '../inputs/create-purchase.input'

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private purchaseService: PurchasesService,
    private productService: ProductsService,
    private customerService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchaseService.listAll()
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productService.getProductById(purchase.productId)
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customerService.getCustomerByAuthUserId(user.sub)

    if (!customer) {
      customer = await this.customerService.createCustomer({
        authUserId: user.sub,
      })
    }

    return this.purchaseService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    })
  }
}
