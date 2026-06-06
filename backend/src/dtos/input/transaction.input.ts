import { TransactionType } from '@prisma/client'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: TransactionType

  @Field(() => Number)
  amount!: number

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  categoryId!: string

  @Field(() => Date)
  date!: Date
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => String, { nullable: true })
  type?: TransactionType

  @Field(() => Number, { nullable: true })
  amount?: number

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => Date, { nullable: true })
  date?: Date
}

@InputType()
export class ListTransactionsInput {
  @Field(() => Number, { defaultValue: 1 })
  page!: number

  @Field(() => Number, { defaultValue: 10 })
  limit!: number

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => Number, { nullable: true })
  month?: number

  @Field(() => Number, { nullable: true })
  year?: number
}
