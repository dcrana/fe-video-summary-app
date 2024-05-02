import { getUserMeLoader } from '@/data/services/get-user-me-loader'
import ProfileForm from '@/components/forms/ProfileForm'
import ProfileImageForm from '@/components/forms/ProfileImageForm'

const AccountRoute = async () => {
  const user = await getUserMeLoader()
  const userData = user.data
  const userImage = userData?.image
  console.log('userImage', userImage)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
      <ProfileForm data={userData} className="col-span-3" />
      <ProfileImageForm data={userImage} className="col-span-2" />
    </div>
  )
}

export default AccountRoute
