import { CreateCategoryInput } from '../dtos/input/category.input.js'
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
}
