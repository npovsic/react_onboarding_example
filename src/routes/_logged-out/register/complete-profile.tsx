import { PrimaryButton } from "#/components/common/buttons/PrimaryButton";
import { FormSelect } from "#/components/common/inputs/FormSelect";
import { FormTextInput } from "#/components/common/inputs/FormTextInput";
import { InfoSafelySecured } from "#/components/logged-out/InfoSafelySecured";
import { LoggedOutShell } from "#/components/logged-out/LoggedOutShell";
import { OnboardingHeader } from "#/components/logged-out/OnboardingHeader";
import { useRegisterStore } from "#/state/registration/registrationStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_logged-out/register/complete-profile")({
  component: RegisterCompleteProfileComponent,
});

const registerIndividualSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  country: z.string().min(1, 'Country is required'),
})


function RegisterCompleteProfileComponent() {
  const updatePayload = useRegisterStore((state) => state.updatePayload);
  
  const methods = useForm();
  
  const navigate = useNavigate()
  
  const [errors, setErrors] = useState<{ address?: string; country?: string }>({});
  
  const handleRegistration = (data: FieldValues) => {
    setErrors({})
    
    const result = registerIndividualSchema.safeParse(data)

    if (!result.success) {
      const fieldErrors: { address?: string; country?: string } = {}
      
      for (const issue of result.error.issues) {
        const path = issue.path[0]
        
        if (typeof path === 'string' && (path === 'address' || path === 'country') && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      
      setErrors(fieldErrors)
      
      return
    }

    updatePayload({
      address: data.address,
      country: data.country,
    })

    navigate({ to: '/register/invite-team' })
  }
  
  return (
    <LoggedOutShell
      header={
          <OnboardingHeader
            navigateBackTo="/register/account"
            currentStep={2}
            totalSteps={3}
            title="Residency Info"
          />
        }
      title="Complete Your Profile!"
      description="For the purpose of industry regulation, your details are required."
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleRegistration)}
          className="flex flex-col gap-4"
        >
          <FormTextInput
            id="address"
            label="Address"
            placeholder="Please enter your address"
            error={errors.address}
            required
            autoFocus
          />

          <FormSelect
            id="country"
            label="Country"
            error={errors.country}
            required
            placeholder="Select your country"
            options={[
              { label: 'Slovenia', value: 'SL' },
              { label: 'United States', value: 'US' },
              { label: 'England', value: 'EN' },
            ]}
          />

          <PrimaryButton type="submit" className="w-full mt-4">
            Continue
          </PrimaryButton>

          <InfoSafelySecured />
        </form>
      </FormProvider>
    </LoggedOutShell>
  );
}
