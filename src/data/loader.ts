import { flattenAttributes, getStrapiURL } from '@/lib/utils'
import { homePageQuery } from '@/queris/homeage'
import { getMetadataQuery, globalquery } from '@/queris/gloabal'
import { unstable_noStore as noStore } from 'next/cache'

const baseUrl = getStrapiURL()

export const fetchData = async (url: string) => {
  const authToken = null // we will implement this later getAuthToken() later
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  }

  try {
    const response = await fetch(url, authToken ? headers : {})
    const data = await response.json()
    return flattenAttributes(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // or return null;
  }
}

export const getHomePageData = async () => {
  noStore()
  const url = new URL('/api/home-page', baseUrl)
  url.search = homePageQuery

  return await fetchData(url.href)
}

export const getGlobalData = async () => {
  noStore()
  const url = new URL('/api/global', baseUrl)
  url.search = globalquery
  return await fetchData(url.href)
}

export const getGlobalPageMetadata = async () => {
  const url = new URL('/api/global', baseUrl)

  url.search = getMetadataQuery

  return await fetchData(url.href)
}
