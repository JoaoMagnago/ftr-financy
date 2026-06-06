import { Field, InputType } from 'type-graphql'

@InputType()
export class PaginationInput {
  @Field(() => Number, { defaultValue: 1 })
  page!: number

  @Field(() => Number, { defaultValue: 10 })
  limit!: number
}
