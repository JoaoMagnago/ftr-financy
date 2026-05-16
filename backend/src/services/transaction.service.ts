import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../dtos/input/transaction.input.js'
import { prismaClient } from '../infra/database/prisma.js'

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
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
      },
    })

    if (!transaction) throw new Error('Transação não encontrada')

    if (transaction?.userId !== userId)
      throw new Error('Usuário não possui permissão para alterar a transação')

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
}
