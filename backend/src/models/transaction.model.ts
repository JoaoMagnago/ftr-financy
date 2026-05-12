import { TransactionType } from '@prisma/client'
import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  type!: TransactionType

  @Field(() => String)
  amount!: string

  @Field(() => String, { nullable: true })
  description: string | undefined

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
