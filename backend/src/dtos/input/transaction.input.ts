import { TransactionType } from '@prisma/client'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: TransactionType

  @Field(() => String)
  amount!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String)
  categoryId!: string

  @Field(() => Date)
  date!: Date
}
