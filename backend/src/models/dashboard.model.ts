import { Field, Int, ObjectType } from 'type-graphql'
import { TransactionModel } from './transaction.model.js'

@ObjectType()
export class DashboardSummaryModel {
  @Field(() => Int)
  currentMonthRevenue!: number

  @Field(() => Int)
  currentMonthExpense!: number

  @Field(() => [TransactionModel])
  latestTransactions!: TransactionModel[]
}
