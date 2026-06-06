import { TransactionType } from '@prisma/client'
import { prismaClient } from '../infra/database/prisma.js'
import { DashboardSummaryModel } from '../models/dashboard.model.js'

export class DashboardService {
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

  async getSummary(userId: string): Promise<DashboardSummaryModel> {
    const [currentMonthRevenue, currentMonthExpense] = await Promise.all([
      this.getCurrentMonthRevenue(userId),
      this.getCurrentMonthExpense(userId),
    ])

    return {
      currentMonthRevenue,
      currentMonthExpense,
    }
  }
}
