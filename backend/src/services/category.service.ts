import { Prisma } from '@prisma/client'
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input.js'
import { prismaClient } from '../infra/database/prisma.js'

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    try {
      return await prismaClient.category.create({
        data: {
          name: data.name,
          description: data.description,
          icon: data.icon,
          color: data.color,
          userId,
        },
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('Já existe uma categoria com este nome')
      }

      throw error
    }
  }

  async updateCategory(id: string, userId: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!category) throw new Error('Categoria não encontrada')

    try {
      return await prismaClient.category.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          icon: data.icon,
          color: data.color,
          userId,
        },
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new Error('Já existe uma categoria com este nome')
      }

      throw error
    }
  }

  async listCategories(userId: string) {
    return prismaClient.category.findMany({
      where: {
        userId,
      },
    })
  }

  async findCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) throw new Error('Categoria não existe')

    return category
  }

  async deleteCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!category) throw new Error('Categoria não encontrada')

    await prismaClient.category.delete({
      where: { id },
    })

    return true
  }
}
