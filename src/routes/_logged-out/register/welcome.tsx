import { PrimaryButton } from '#/components/common/buttons/PrimaryButton'
import { SvgSuccess } from '#/components/common/svgs/SvgSuccess'
import AuthenticationUtil from '#/utils/authentication'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_logged-out/register/welcome')({
  component: RegisterWelcomeComponent,
})

function RegisterWelcomeComponent() {
  const navigate = useNavigate()
  
  const enterApp = () => {
    AuthenticationUtil.setAuthenticated(true)
    
    navigate({ to: '/' })
  }
  
  return (
    <div className="flex flex-col gap-4 items-center justify-center m-auto">
      <SvgSuccess className="w-[150px] h-[150px] text-primary" />
      
      <p className="text-3xl font-bold text-on-background">Success!</p>
      
      <p className="text-on-background-dimmed text-center max-w-[400px]">
        You have received an email where you can read more about your account and setup your password.
      </p>
      
      <PrimaryButton className="w-full mt-4" onClick={() => enterApp()}>
        Continue
      </PrimaryButton>
    </div>
  )
}
