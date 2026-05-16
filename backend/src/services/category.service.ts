import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '../dtos/input/category.input.js'
import { prismaClient } from '../infra/database/prisma.js'

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        name: data.name,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId,
      },
    })
  }

  async updateCategory(id: string, userId: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) throw new Error('Categoria não encontrada')

    if (category?.userId !== userId)
      throw new Error('Usuário não possui permissão para alterar a categoria')

    return prismaClient.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId,
      },
    })
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
      },
    })

    if (!category) throw new Error('Categoria não existe')

    if (category?.userId !== userId)
      throw new Error('Usuário não possui permissão para deletar a categoria')

    const deletedCategory = await prismaClient.category.delete({
      where: { id },
    })

    return true
  }
}
