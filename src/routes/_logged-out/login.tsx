import { PrimaryButton } from '#/components/common/buttons/PrimaryButton'
import { FormPasswordInput } from '#/components/common/inputs/FormPasswordInput'
import { FormTextInput } from '#/components/common/inputs/FormTextInput'
import { LoggedOutShell } from '#/components/logged-out/LoggedOutShell'
import AuthenticationUtil from '#/utils/authentication'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FormProvider, useForm, type FieldValues } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/_logged-out/login')({
  component: LoginComponent,
})

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

function LoginComponent() {
  const methods = useForm();
  
  const navigate = useNavigate()

  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  const handleLogin = (data: FieldValues) => {
    setErrors({})
    
    const result = loginSchema.safeParse(data)

    if (!result.success) {
      const fieldErrors: { username?: string; password?: string } = {}
      
      for (const issue of result.error.issues) {
        const path = issue.path[0]
        
        if (typeof path === 'string' && (path === 'username' || path === 'password') && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      
      setErrors(fieldErrors)
      
      return
    }

    AuthenticationUtil.setAuthenticated(true)
    
    navigate({ to: '/' })
  }

  return (
    <LoggedOutShell 
    header={
      <p className="text-on-background-dimmed self-end">Don't have an account yet? <Link to="/register">Register here</Link></p>
    }
    title="Login"
    description="Enter your email and password to login."
    >
      <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleLogin)} className="flex flex-col gap-4">
            <FormTextInput
              id="username"
              label="Username"
              placeholder="Enter your username"
              error={errors.username}
              required
            />
            
            <FormPasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              required
            />

            <PrimaryButton type="submit" className="w-full mt-4">Login</PrimaryButton>
          </form>
        </FormProvider>
    </LoggedOutShell>
  )
}
