import { UseGuards } from '@nestjs/common'
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql'

import { Customer } from '../models/customer.model'
import { AuthorizationGuard } from '~http/auth/authorization.guard'
import { CustomersService } from '~services/customers.service'
import { AuthUser, CurrentUser } from '~http/auth/current-user'
import { PurchasesService } from '~services/purchases.service'

@Resolver(() => Customer)
export class CustomersResolver {
  constructor (
    private customerService: CustomersService,
    private purchaseService: PurchasesService,
  ) { }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub)
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchaseService.listAllFromCustomer(customer.id)
  }

  @ResolveReference()
  resolverReference(reference: { authUserId: string }) {
    return this.customerService.getCustomerByAuthUserId(reference.authUserId)
  }
}
