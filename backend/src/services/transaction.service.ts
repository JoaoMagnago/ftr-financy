import { Prisma } from '@prisma/client'
import {
  CreateTransactionInput,
  ListTransactionsInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input.js'
import { prismaClient } from '../infra/database/prisma.js'

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id: data.categoryId,
        userId,
      },
    })

    if (!category) throw new Error('Categoria não encontrada')

    return prismaClient.transaction.create({
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: data.date,
        categoryId: data.categoryId,
        userId,
      },
    })
  }

  async updateTransaction(
    id: string,
    userId: string,
    data: UpdateTransactionInput,
  ) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!transaction) throw new Error('Transação não encontrada')

    return prismaClient.transaction.update({
      where: { id },
      data: {
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: data.date,
        categoryId: data.categoryId,
        userId,
      },
    })
  }

  async listTransactions(userId: string, filters: ListTransactionsInput) {
    const {
      page = 1,
      limit = 10,
      description,
      type,
      categoryId,
      month,
      year,
    } = filters

    const skip = (page - 1) * limit

    let startDate: Date | undefined
    let endDate: Date | undefined

    if (month && year) {
      startDate = new Date(year, month - 1, 1)
      endDate = new Date(year, month, 1)
    }

    // Adiciona condicionalmente os filtros se forem passados. Isso evita o uso de vários blocos de if ou um switch grande
    const where: Prisma.TransactionWhereInput = {
      userId,

      ...(description && {
        description: {
          contains: description,
        },
      }),

      ...(type && { type }),

      ...(categoryId && { categoryId }),

      ...(startDate &&
        endDate && {
          date: {
            gte: startDate,
            lt: endDate,
          },
        }),
    }

    const [items, total] = await Promise.all([
      prismaClient.transaction.findMany({
        where,
        orderBy: {
          date: 'desc',
        },
        skip,
        take: limit,
      }),

      prismaClient.transaction.count({
        where,
      }),
    ])

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    }
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!transaction) throw new Error('Transação não encontrada')

    await prismaClient.transaction.delete({
      where: { id },
    })

    return true
  }
}
