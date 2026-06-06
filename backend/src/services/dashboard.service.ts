import { TransactionType } from '@prisma/client'
import { prismaClient } from '../infra/database/prisma.js'
import {
  CategoryStatisticsModel,
  DashboardSummaryModel,
} from '../models/dashboard.model.js'

export class DashboardService {
  async getBalance(userId: string): Promise<number> {
    const [revenue, expense] = await Promise.all([
      prismaClient.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.REVENUE,
        },
        _sum: {
          amount: true,
        },
      }),

      prismaClient.transaction.aggregate({
        where: {
          userId,
          type: TransactionType.EXPENSE,
        },
        _sum: {
          amount: true,
        },
      }),
    ])

    return (revenue._sum.amount ?? 0) - (expense._sum.amount ?? 0)
  }

  private async getCurrentMonthAmount(
    userId: string,
    type: TransactionType,
  ): Promise<number> {
    const startOfMonth = new Date()

    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const result = await prismaClient.transaction.aggregate({
      where: {
        userId,
        type,
        date: {
          gte: startOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    })

    return result._sum.amount ?? 0
  }

  async getCurrentMonthRevenue(userId: string): Promise<number> {
    return this.getCurrentMonthAmount(userId, TransactionType.REVENUE)
  }

  async getCurrentMonthExpense(userId: string): Promise<number> {
    return this.getCurrentMonthAmount(userId, TransactionType.EXPENSE)
  }

  async listLatestTransactions(userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        userId,
      },
      take: 5,
      orderBy: {
        date: 'desc',
      },
    })
  }

  async getTransactionCount(userId: string): Promise<number> {
    return prismaClient.transaction.count({
      where: {
        userId,
      },
    })
  }

  async getCategoryCount(userId: string): Promise<number> {
    return prismaClient.category.count({
      where: {
        userId,
      },
    })
  }

  async getCategoriesStatistics(
    userId: string,
  ): Promise<CategoryStatisticsModel[]> {
    const [categories, statistics] = await Promise.all([
      prismaClient.category.findMany({
        where: {
          userId,
        },
      }),

      prismaClient.transaction.groupBy({
        by: ['categoryId'],
        where: {
          userId,
        },
        _count: {
          id: true,
        },
        _sum: {
          amount: true,
        },
      }),
    ])

    const statisticsMap = new Map(
      statistics.map((item) => [item.categoryId, item]),
    )

    return categories.map((category) => {
      const stats = statisticsMap.get(category.id)

      return {
        category,
        transactionCount: stats?._count.id ?? 0,
        totalAmount: stats?._sum.amount ?? 0,
      }
    })
  }

  async getSummary(userId: string): Promise<DashboardSummaryModel> {
    const [
      balance,
      currentMonthRevenue,
      currentMonthExpense,
      latestTransactions,
      transactionCount,
      categoryCount,
    ] = await Promise.all([
      this.getBalance(userId),
      this.getCurrentMonthRevenue(userId),
      this.getCurrentMonthExpense(userId),
      this.listLatestTransactions(userId),
      this.getTransactionCount(userId),
      this.getCategoryCount(userId),
    ])

    return {
      balance,
      currentMonthRevenue,
      currentMonthExpense,
      latestTransactions,
      categoryCount,
      transactionCount,
    }
  }
}
