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
    <>
      <div>I am logged in.</div>
      
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
