import { PrimaryButton } from "#/components/common/buttons/PrimaryButton";
import { IconChevronLeft } from "#/components/common/icons/IconChevronLeft";
import { IconLock } from "#/components/common/icons/IconLock";
import { FormPasswordInput } from "#/components/common/inputs/FormPasswordInput";
import { FormTextInput } from "#/components/common/inputs/FormTextInput";
import { InfoSafelySecured } from "#/components/logged-out/InfoSafelySecured";
import { LoggedOutShell } from "#/components/logged-out/LoggedOutShell";
import { OnboardingHeader } from "#/components/logged-out/OnboardingHeader";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_logged-out/register/individual")({
  component: RegisterIndividualComponent,
});

const registerIndividualSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})


function RegisterIndividualComponent() {
  const methods = useForm();
  
  const navigate = useNavigate()
  
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});
  
  const handleRegistration = (data: FieldValues) => {
    setErrors({})
    
    const result = registerIndividualSchema.safeParse(data)

    if (!result.success) {
      const fieldErrors: { fullName?: string; email?: string; password?: string } = {}
      
      for (const issue of result.error.issues) {
        const path = issue.path[0]
        
        if (typeof path === 'string' && (path === 'fullName' || path === 'password' || path === 'email') && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      
      setErrors(fieldErrors)
      
      return
    }

    navigate({ to: '/register/complete-profile' })
  }
  
  return (
    <LoggedOutShell
      header={
        <OnboardingHeader
          navigateBackTo="/register"
          currentStep={1}
          totalSteps={3}
          title="Personal Information"
        />
      }
      title="Register Individual Account"
      description="Create an account to get started."
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleRegistration)}
          className="flex flex-col gap-4"
        >
          <FormTextInput
            id="fullName"
            label="Full name"
            placeholder="Enter your full name"
            error={errors.fullName}
            required
            autoFocus
          />

          <FormTextInput
            id="email"
            label="E-mail address"
            placeholder="Enter e-mail address"
            error={errors.email}
            required
            type="email"
          />

          <FormPasswordInput
            id="password"
            label="Create password"
            placeholder="Create a password"
            error={errors.password}
            required
          />

          <PrimaryButton type="submit" className="w-full mt-4">
            Register Account
          </PrimaryButton>
          
          <InfoSafelySecured />
        </form>
      </FormProvider>
    </LoggedOutShell>
  );
}
