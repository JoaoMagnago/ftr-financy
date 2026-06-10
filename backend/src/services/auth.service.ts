import {
  LoginInput,
  RegisterInput,
  UpdateProfileInput,
} from '../dtos/input/auth.input.js'
import { UserModel } from '../models/user.model.js'
import { prismaClient } from '../infra/database/prisma.js'
import { comparePassword, hashPassword } from '../utils/hash.js'
import { signJwt } from '../utils/jwt.js'

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (!existingUser) throw new Error('Usuário não cadastrado!')

    const compare = await comparePassword(data.password, existingUser.password)

    if (!compare) throw new Error('Senha inválida!')

    return this.gerenerateTokens(existingUser)
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (existingUser) throw new Error('E-mail já cadastrado!')

    const hash = await hashPassword(data.password)

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    })
    return this.gerenerateTokens(user)
  }

  gerenerateTokens(user: UserModel) {
    const token = signJwt({ id: user.id, email: user.email }, '1d')
    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d')
    return { token, refreshToken, user }
  }

  async updateProfile(userId: string, data: UpdateProfileInput) {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name.trim(),
      },
    })

    return updatedUser
  }
}
