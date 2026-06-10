import { Arg, Mutation, Resolver } from 'type-graphql'
import { AuthService } from '../services/auth.service.js'
import { LoginOutput, RegisterOutput } from '../dtos/output/auth.output.js'
import {
  LoginInput,
  RegisterInput,
  UpdateProfileInput,
} from '../dtos/input/auth.input.js'
import { GqlUser } from '../graphql/decorators/user.decorator.js'
import { UserModel } from '../models/user.model.js'

@Resolver()
export class AuthResolver {
  private authService = new AuthService()

  @Mutation(() => LoginOutput)
  async login(
    @Arg('data', () => LoginInput) data: LoginInput,
  ): Promise<LoginOutput> {
    return this.authService.login(data)
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Arg('data', () => RegisterInput) data: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.authService.register(data)
  }

  @Mutation(() => UserModel)
  async updateProfile(
    @GqlUser() user: UserModel,
    @Arg('data', () => UpdateProfileInput) data: UpdateProfileInput,
  ): Promise<UserModel> {
    return this.authService.updateProfile(user.id, data)
  }
}
