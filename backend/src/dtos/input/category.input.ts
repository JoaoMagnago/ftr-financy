import { CategoryIcon } from '@prisma/client'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => String)
  icon!: CategoryIcon

  @Field(() => String)
  color!: string
}
