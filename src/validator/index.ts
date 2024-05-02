import { z } from 'zod'

export const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: 'Username must be between 3 and 20 characters',
  }),
  password: z.string().min(6).max(100, {
    message: 'Password must be between 6 and 100 characters',
  }),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address',
    })
    .max(60, {
      message: 'Please enter a valid username or email address',
    }),
})

export const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: 'Identifier must have at least 3 or more characters',
    })
    .max(60, {
      message: 'Please enter a valid username or email address',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must have at least 6 or more characters',
    })
    .max(100, {
      message: 'Password must be between 6 and 100 characters',
    }),
})

export const schemaProfile = z.object({
  firstName: z
    .string()
    .min(3, {
      message: 'Firstname must be between 3 and 20 characters',
    })
    .max(20, {
      message: 'Firstname must be between 3 and 20 characters',
    }),
  lastName: z
    .string()
    .min(3, {
      message: 'Lastname must be between 3 and 20 characters',
    })
    .max(20, {
      message: 'Lastname must be between 3 and 20 characters',
    }),
  bio: z
    .string()
    .min(3, {
      message: 'Bio must be between 3 and 100 characters',
    })
    .max(100, {
      message: 'Bio must be between 3 and 100 characters',
    }),
})

const MAX_FILE_SIZE = 5000000

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => {
      if (file.size === 0 || file.name === undefined) return false
      else return true
    }, 'Please update or add new image.')

    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
})
