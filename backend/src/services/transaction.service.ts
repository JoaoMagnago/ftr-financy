import {
  CreateTransactionInput,
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

  async listTransactions(userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        userId,
      },
    })
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
