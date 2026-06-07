import { TransactionType } from '@prisma/client'
import { Field, GraphQLISODateTime, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  type!: TransactionType

  @Field(() => Number)
  amount!: number

  @Field(() => String)
  description!: string

  @Field(() => String)
  userId!: string

  @Field(() => String)
  categoryId!: string

  @Field(() => Date)
  date!: Date

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}

@ObjectType()
export class PaginatedTransactionsModel {
  @Field(() => [TransactionModel])
  items!: TransactionModel[]

  @Field(() => Int)
  total!: number

  @Field(() => Int)
  page!: number

  @Field(() => Int)
  limit!: number

  @Field(() => Int)
  pages!: number
}
