const getStrapiData = async (url: string) => {
  const baseUrl = 'http://127.0.0.1:1337'
  try {
    const response = await fetch(baseUrl + url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const Home = async () => {
  const strapiData = await getStrapiData('/api/home-page')

  const { title, description } = strapiData.data.attributes

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>
    </main>
  )
}

export default Home
