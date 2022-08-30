import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
class Product {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field()
  slug: string
}

export default Product
