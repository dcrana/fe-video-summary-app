import { logoutAction } from '@/data/actions/auth-actions'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <button type="submit">
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  )
}

export default LogoutButton
