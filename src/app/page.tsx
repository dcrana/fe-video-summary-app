import HeroSection from '@/components/custom/HeroSection'
import { flattenAttributes } from '@/lib/utils'
import { homePageQuery } from '@/queris/homeage'

const getStrapiData = async (path: string) => {
  const baseUrl = 'http://127.0.0.1:1337'
  const url = new URL(path, baseUrl)
  url.search = homePageQuery
  try {
    const response = await fetch(url.href, { cache: 'no-store' })
    const data = await response.json()
    console.log('data', data)
    const flattenedData = flattenAttributes(data)
    return flattenedData
  } catch (error) {
    console.error(error)
  }
}

const Home = async () => {
  const strapiData = await getStrapiData('/api/home-page')
  const { blocks } = strapiData

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  )
}

export default Home
