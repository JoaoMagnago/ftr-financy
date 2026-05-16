import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { TransactionModel } from '../models/transaction.model.js'
import { CreateTransactionInput } from '../dtos/input/transaction.input.js'
import { TransactionService } from '../services/transaction.service.js'
import { GqlUser } from '../graphql/decorators/user.decorator.js'
import { IsAuth } from '../middlewares/auth.middleware.js'
import { UserModel } from '../models/user.model.js'
import { CategoryModel } from '../models/category.model.js'
import { CategoryService } from '../services/category.service.js'

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()
  private categoryService = new CategoryService()

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id)
  }

  @Query(() => [TransactionModel])
  async listTransactions(
    @GqlUser() user: UserModel,
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id)
  }

  @FieldResolver(() => CategoryModel)
  async category(
    @Root() transaction: TransactionModel,
  ): Promise<CategoryModel> {
    return this.categoryService.findCategory(transaction.categoryId)
  }
}
