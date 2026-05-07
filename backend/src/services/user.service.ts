import { CreateUserInput } from '../dtos/input/user.input.js'
import { prismaClient } from '../infra/database/prisma.js'

export class UserService {
  async createUser(data: CreateUserInput) {
    const findUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    })
    if (findUser) throw new Error('Usuário já cadastrado!')

    return prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })
  }

  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) throw new Error('Usuário não existe')

    return user
  }
}
