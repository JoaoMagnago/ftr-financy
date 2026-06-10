import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apolloClient } from '@/lib/graphql/apollo'
import type {
  User,
  RegisterInput,
  LoginInput,
  UpdateProfileInput,
} from '@/types'
import { LOGIN } from '../lib/graphql/mutations/Login'
import { REGISTER } from '@/lib/graphql/mutations/Register'
import { UPDATE_PROFILE } from '@/lib/graphql/mutations/Profile'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  updatingProfile: boolean
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  logout: () => void
  updateProfile: (data: UpdateProfileInput) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      updatingProfile: false,
      login: async (loginData: LoginInput) => {
        try {
          const { data } = await apolloClient.mutate({
            mutation: LOGIN,
            variables: {
              data: {
                email: loginData.email,
                password: loginData.password,
              },
            },
          })

          if (data?.login) {
            const { user, token } = data.login
            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })

            return true
          }

          return false
        } catch (error) {
          console.log('Erro ao fazer o login')
          throw error
        }
      },
      signup: async (registerData: RegisterInput) => {
        try {
          const { data } = await apolloClient.mutate({
            mutation: REGISTER,
            variables: {
              data: {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
              },
            },
          })

          if (data?.register) {
            const { token, user } = data.register
            set({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
              token,
              isAuthenticated: true,
            })

            return true
          }

          return false
        } catch (error) {
          console.log('Erro ao fazer o cadastro')
          throw error
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        apolloClient.clearStore()
      },
      updateProfile: async (updateData) => {
        set({ updatingProfile: true })

        try {
          const { data } = await apolloClient.mutate({
            mutation: UPDATE_PROFILE,
            variables: {
              data: updateData,
            },
          })

          const updatedUser = data?.updateProfile

          if (!updatedUser) return

          set((state) => ({
            user: state.user
              ? {
                  ...state.user,
                  ...updatedUser,
                }
              : null,
          }))
        } catch (error) {
          console.log('Erro ao atualizar informações do usuário')
          throw error
        } finally {
          set({ updatingProfile: false })
        }
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
