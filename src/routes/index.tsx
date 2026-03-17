import { PrimaryButton } from '#/components/common/buttons/PrimaryButton';
import AuthenticationUtil from '#/utils/authentication'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    AuthenticationUtil.setAuthenticated(false);
    
    navigate({ to: '/login' });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-on-background text-2xl font-bold">I am logged in.</div>
      
      <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
    </div>
  )
}
