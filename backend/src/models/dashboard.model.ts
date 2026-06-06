import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class DashboardSummaryModel {
  @Field(() => Int)
  currentMonthRevenue!: number

  @Field(() => Int)
  currentMonthExpense!: number
}
