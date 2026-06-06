import { Field, Int, ObjectType } from 'type-graphql'
import { TransactionModel } from './transaction.model.js'
import { CategoryModel } from './category.model.js'

@ObjectType()
export class DashboardSummaryModel {
  @Field(() => Int)
  currentMonthRevenue!: number

  @Field(() => Int)
  currentMonthExpense!: number

  @Field(() => [TransactionModel])
  latestTransactions!: TransactionModel[]

  @Field(() => Int)
  transactionCount!: number

  @Field(() => Int)
  categoryCount!: number

  @Field(() => Int)
  balance!: number

  @Field(() => CategoryStatisticsModel, { nullable: true })
  mostUsedCategory!: CategoryStatisticsModel | null
}

@ObjectType()
export class CategoryStatisticsModel {
  @Field(() => CategoryModel)
  category!: CategoryModel

  @Field(() => Int)
  transactionCount!: number

  @Field(() => Int)
  totalAmount!: number
}
