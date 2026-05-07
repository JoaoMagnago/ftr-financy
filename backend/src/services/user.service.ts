import { prismaClient } from '../infra/database/prisma.js'

export class UserService {
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
