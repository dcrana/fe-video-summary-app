import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import { getUserMeLoader } from '@/data/services/get-user-me-loader'
import LoggedInUser from './LoggedInUser'

interface HeaderProps {
  data: {
    logoText: {
      id: number
      text: string
      url: string
    }
    ctaButton: {
      id: number
      text: string
      url: string
    }
  }
}

const Header = async ({ data }: Readonly<HeaderProps>) => {
  const { logoText, ctaButton } = data
  const user = await getUserMeLoader()
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text} />
      <div className="flex items-center gap-4">
        {user.ok ? (
          <LoggedInUser userData={user.data} />
        ) : (
          <Link href={ctaButton.url}>
            <Button>{ctaButton.text}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
