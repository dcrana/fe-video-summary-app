import FeatureSection from '@/components/custom/FeatureSection'
import HeroSection from '@/components/custom/HeroSection'
import { getHomePageData } from '@/data/loader'
import { flattenAttributes, getStrapiURL } from '@/lib/utils'
import { homePageQuery } from '@/queris/homeage'



const blockRenderer = (block: any) => {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.feature-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

const Home = async () => {
  const strapiData = await getHomePageData()
  const { blocks } = strapiData
  if (!blocks) return <p>No sections found</p>;

  return (
    <main>
      {blocks.map(blockRenderer)}
    </main>
  )
}

export default Home
