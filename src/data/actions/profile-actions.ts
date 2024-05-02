'use server'
import { flattenAttributes } from '@/lib/utils'
import { schemaProfile } from '@/validator'
import qs from 'qs'
import { mutateData } from '../services/mutate-data'

export async function updateProfileAction(
  userId: string,
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData)

  const query = qs.stringify({
    populate: '*',
  })

  const validatedFields = schemaProfile.safeParse({
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Register.',
    }
  }

  const payload = {
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
  }

  const responseData = await mutateData(
    'PUT',
    `/api/users/${userId}?${query}`,
    payload
  )

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: 'Failed to Register.',
    }
  }

  const flattenedData = flattenAttributes(responseData)

  return {
    ...prevState,
    message: 'Profile Updated',
    data: flattenedData,
    strapiErrors: null,
    zodErrors: null,
  }
}
