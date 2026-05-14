import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { GqlUser } from '../graphql/decorators/user.decorator.js'
import { IsAuth } from '../middlewares/auth.middleware.js'
import { UserModel } from '../models/user.model.js'
import { CategoryModel } from '../models/category.model.js'
import { CategoryService } from '../services/category.service.js'
import { CreateCategoryInput } from '../dtos/input/category.input.js'

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id)
  }
}
