import { Query, Resolver, UseMiddleware } from 'type-graphql'
import { GqlUser } from '../graphql/decorators/user.decorator.js'
import { IsAuth } from '../middlewares/auth.middleware.js'
import { UserModel } from '../models/user.model.js'
import { DashboardService } from '../services/dashboard.service.js'
import {
  CategoryStatisticsModel,
  DashboardSummaryModel,
} from '../models/dashboard.model.js'

@Resolver()
@UseMiddleware(IsAuth)
export class DashboardResolver {
  private dashboardService = new DashboardService()

  @Query(() => DashboardSummaryModel)
  async dashboardSummary(
    @GqlUser() user: UserModel,
  ): Promise<DashboardSummaryModel> {
    return this.dashboardService.getSummary(user.id)
  }

  @Query(() => [CategoryStatisticsModel])
  async categoriesStatistics(
    @GqlUser() user: UserModel,
  ): Promise<CategoryStatisticsModel[]> {
    return this.dashboardService.getCategoriesStatistics(user.id)
  }
}
