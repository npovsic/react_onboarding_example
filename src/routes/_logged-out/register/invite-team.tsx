import { PrimaryButton } from '#/components/common/buttons/PrimaryButton'
import { IconAdd } from '#/components/common/icons/IconAdd'
import { IconDelete } from '#/components/common/icons/IconDelete'
import { FormTextInput } from '#/components/common/inputs/FormTextInput'
import { InfoSafelySecured } from '#/components/logged-out/InfoSafelySecured'
import { LoggedOutShell } from '#/components/logged-out/LoggedOutShell'
import { OnboardingHeader } from '#/components/logged-out/OnboardingHeader'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FormProvider, useForm, type FieldValues } from 'react-hook-form'
import { z } from 'zod'
import { useStore } from 'zustand'

interface TeamMember {
  // We only need the index to identify the team member, 
  // the email will be in the form data.
  index: number
}

export const Route = createFileRoute('/_logged-out/register/invite-team')({
  beforeLoad: async ({ context }) => {
    const registrationStore = context.registrationStore.getState();
    
    const payload = registrationStore.payload;

    if (
      !payload?.accountType ||
      !payload.name ||
      !payload.email ||
      !payload.password ||
      !payload.terms ||
      !payload.address ||
      !payload.country
    ) {
      // If any of the required fields (other than team) are missing, we redirect to the register page.
      
      registrationStore.replacePayload({});
      
      throw redirect({ to: "/register" });
    }

    return payload;
  },
  component: RegisterInviteTeamComponent,
})

const teamMemberSchema = z
  .object({})
  .catchall(z.email('Invalid email address'))

const maxNumberOfTeamMembers = 5

function RegisterInviteTeamComponent() {
  const { registrationStore } = Route.useRouteContext();
  
  const payload = useStore(registrationStore, (state) => state.payload);
  const updatePayload = useStore(registrationStore, (state) => state.updatePayload);
  
  const methods = useForm();
  
  const navigate = useNavigate()
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const addNewTeamMember = () => {
    if (teamMembers.length >= maxNumberOfTeamMembers) {
      return
    }
    
    setTeamMembers([...teamMembers, { index: teamMembers.length }])
  }
  
  const removeTeamMember = (teamMember: TeamMember) => {
    setErrors({})
    
    methods.unregister(`teamMemberEmail-${teamMember.index}`)
    
    setTeamMembers(teamMembers.filter((member) => member.index !== teamMember.index))
  }
  
  const onSubmit = (data: FieldValues) => {
    setErrors({})

    if (teamMembers.length === 0) {
      updatePayload({
        team: [],
      })
      
      navigate({ to: '/register/welcome' })
      
      return
    }
    
    const result = teamMemberSchema.safeParse(data)
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}

      for (const issue of result.error.issues) {
        const path = issue.path[0]

        if (typeof path === 'string' && path.startsWith('teamMemberEmail-') && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      
      setErrors(fieldErrors)
      
      return
    }
    
    const teamMemberEmails = Object.values(data);
    
    const emailMismatches: Record<string, string> = {}
    
    for (let i = 0; i < teamMemberEmails.length; i++) {
      const teamMemberEmail = teamMemberEmails[i]
      
      
      if (teamMemberEmail === payload?.email) {
        emailMismatches[`teamMemberEmail-${i}`] = 'You cannot invite yourself'
      }
      
      const duplicateEmail = teamMemberEmails.find((email, index) => email === teamMemberEmail && index !== i)
      
      if (duplicateEmail) {
        emailMismatches[`teamMemberEmail-${i}`] = 'Team member with this email was already added'
      }
    }
    
    if (Object.keys(emailMismatches).length > 0) {
      setErrors(emailMismatches)
      
      return
    }
    
    updatePayload({
      team: teamMemberEmails,
    })
    
    navigate({ to: '/register/welcome' })
  }
  
  return (
    <LoggedOutShell
    header={
      <OnboardingHeader
            navigateBackTo="/register/complete-profile"
            currentStep={3}
            totalSteps={3}
            title="Team"
          />
    }
    title="Invite your team"
    description="Invite your team to join you on your journey."
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {teamMembers.length > 0 && (
            <p className="text-base font-medium text-on-background-dimmed">
             Team members
          </p>
          )}
          
          {teamMembers.map((teamMember) => (
            <div key={teamMember.index} className='flex flex-col gap-2'>
              <div className="flex items-center gap-2 w-full">
                <FormTextInput
                  id={`teamMemberEmail-${teamMember.index}`}
                  placeholder="Enter your team member's email address"
                  type="email"
                  required
                />
              
                <button type="button" className="text-error font-medium hover:bg-error/10 rounded-full p-2 transition-colors duration-200" onClick={() => removeTeamMember(teamMember)}>
                  <IconDelete className="w-[24px] h-[24px]" />
                </button>
            </div>
            
              {/* Why is this here instead of in the FormTextInput component? Because the delete button needs to line up with the input,
              and the error message inside the FormTextInput breaks the layout. */}
              {errors[`teamMemberEmail-${teamMember.index}`] && (
                <p className="text-sm font-medium text-error">{errors[`teamMemberEmail-${teamMember.index}`]}</p>
              )}
            </div>
          ))}

          <button className="flex items-center gap-2 text-primary font-medium mt-4 disabled:opacity-50 disabled:cursor-not-allowed" disabled={teamMembers.length >= maxNumberOfTeamMembers} type="button" onClick={() => addNewTeamMember()}>
            <IconAdd className="w-[16px] h-[16px]" />
            
            Add Teammate {teamMembers.length ? `${teamMembers.length} / ${maxNumberOfTeamMembers}` : ''}
          </button>

          <PrimaryButton type="submit" className="w-full mt-4">
            {teamMembers.length > 0 ? 'Save & Finish' : 'Finish without a team'}
          </PrimaryButton>
          
          <InfoSafelySecured />
        </form>
      </FormProvider>
    </LoggedOutShell>
  )
}
