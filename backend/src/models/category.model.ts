import { CategoryIcon } from '@prisma/client'
import { Field, GraphQLISODateTime, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
class CategoryBaseModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => String)
  icon!: CategoryIcon

  @Field(() => String)
  color!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

@ObjectType()
export class CategoryModel extends CategoryBaseModel {}

@ObjectType()
export class CategoryListItemModel extends CategoryBaseModel {
  @Field(() => Int)
  transactionCount!: number
}
