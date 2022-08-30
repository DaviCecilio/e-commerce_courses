import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'node:path'
import { MessagingModule } from 'src/messaging/messaging.module'

import { DatabaseModule } from '~database/database.module'
import {
  ProductResolver,
  PurchaseResolver,
  CustomersResolver,
} from '~http/graphql/resolvers'

import {
  ProductsService,
  PurchasesService,
  CustomersService,
} from '~services/index'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.ggl'),
    }),
  ],
  providers: [
    ProductResolver,
    PurchaseResolver,
    CustomersResolver,

    PurchasesService,
    ProductsService,
    CustomersService,
  ],
})
export class HttpModule { }
