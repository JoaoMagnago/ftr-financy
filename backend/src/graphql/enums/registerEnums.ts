import { registerEnumType } from 'type-graphql'

import { TransactionType, CategoryIcon } from '@prisma/client'

registerEnumType(TransactionType, {
  name: 'TransactionType',
})

registerEnumType(CategoryIcon, {
  name: 'CategoryIcon',
})
