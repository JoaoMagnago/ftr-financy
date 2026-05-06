import jwt, { Secret, SignOptions } from 'jsonwebtoken'

export type JwtPayload = {
  id: string
  email: string
}

type ExpirationType = NonNullable<SignOptions['expiresIn']>

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
  let options: SignOptions = {}

  const secret: Secret = process.env.JWT_SECRET as Secret
  const expiration = expiresIn

  if (expiration) {
    options = {
      expiresIn: expiration as ExpirationType,
    }
  }

  return jwt.sign(payload, secret, options)
}

export const verifyJwt = (token: string) => {
  const secret: Secret = process.env.JWT_SECRET as Secret

  return jwt.verify(token, secret) as JwtPayload
}
