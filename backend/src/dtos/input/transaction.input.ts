import { TransactionType } from '@prisma/client'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  type!: TransactionType

  @Field(() => String)
  amount!: string

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

  @Field(() => String, { nullable: true })
  amount?: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => Date, { nullable: true })
  date?: Date
}
