'use server'
import { schemaLogin, schemaRegister } from '@/validator'
import { loginUserService, registerUserService } from '../services/auth-service'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
}

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Register.',
    }
  }

  const responseData = await registerUserService(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    }
  }

  cookies().set('jwt', responseData.jwt, config)
  redirect('/dashboard')
}

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.',
    }
  }

  const responseData = await loginUserService(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Login.',
    }
  }

  cookies().set('jwt', responseData.jwt)
  redirect('/dashboard')
}

export async function logoutAction() {
  cookies().set('jwt', '', { ...config, maxAge: 0 })
  redirect('/')
}
