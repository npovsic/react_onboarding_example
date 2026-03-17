import { PrimaryButton } from '#/components/common/buttons/PrimaryButton'
import { IconAdd } from '#/components/common/icons/IconAdd'
import { IconChevronLeft } from '#/components/common/icons/IconChevronLeft'
import { IconDelete } from '#/components/common/icons/IconDelete'
import { IconLock } from '#/components/common/icons/IconLock'
import { FormTextInput } from '#/components/common/inputs/FormTextInput'
import { LoggedOutShell } from '#/components/logged-out/LoggedOutShell'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute('/_logged-out/register/invite-team')({
  component: RegisterInviteTeamComponent,
})

const registerInviteTeamSchema = z.object({
  teamMemberEmail: z.email('Invalid email address'),
})

function RegisterInviteTeamComponent() {
  const methods = useForm();
  
  const navigate = useNavigate()
  
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  
  const [errors, setErrors] = useState<{ teamMemberEmail?: string }>({});
  
  const addTeamMember = (data: FieldValues) => {
    setErrors({})
    
    const result = registerInviteTeamSchema.safeParse(data)

    if (!result.success) {
      const fieldErrors: { teamMemberEmail?: string } = {}
      
      for (const issue of result.error.issues) {
        const path = issue.path[0]
        
        if (typeof path === 'string' && (path === 'teamMemberEmail') && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      
      setErrors(fieldErrors)
      
      return
    }
    
    methods.reset();
    
    if (teamMembers.includes(data.teamMemberEmail)) {
      return
    }
    
    setTeamMembers([...teamMembers, data.teamMemberEmail])
  }
  
  const removeTeamMember = (teamMember: string) => {
    setTeamMembers(teamMembers.filter((member) => member !== teamMember))
  }
  
  return (
    <LoggedOutShell
    header={
      <div className="flex items-center justify-between gap-2">
        <Link to="/register/individual" className="flex items-center gap-2 no-underline!">
          <IconChevronLeft className="w-[16px] h-[16px] text-on-background-dimmed" />

          <p className="text-on-background-dimmed">Back</p>
        </Link>

        <div className="flex flex-col">
          <p className="text-on-background-muted text-sm text-end">STEP 03/03</p>
          <p className="text-base font-medium text-on-background-dimmed text-end">
            Team
          </p>
        </div>
      </div>
    }
    title="Invite your team"
    description="Invite your team to join you on your journey."
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(addTeamMember)}
          className="flex flex-col gap-4"
        >
          {teamMembers.length > 0 && (
            <p className="text-base font-medium text-on-background-dimmed">
             Team members
          </p>
          )}
          
          {teamMembers.map((teamMember) => (
            <div className="flex items-center gap-2">
              <div key={teamMember} className="min-w-0 grow flex items-center gap-2 bg-surface rounded-lg p-4 border border-primary shadow-lg text-sm">
                <p className="text-on-background">{teamMember}</p>
              </div>
              
              <button type="button" className="text-error font-medium" onClick={() => removeTeamMember(teamMember)}>
                <IconDelete className="w-[24px] h-[24px]" />
              </button>
            </div>
          ))}

          <FormTextInput
            id="teamMemberEmail"
            placeholder="Enter your team member's email address"
            error={errors.teamMemberEmail}
            type="email"
          />
          
          <button type="submit" className="flex items-center gap-2 text-primary font-medium">
            <IconAdd className="w-[16px] h-[16px]" />
            
            Add Teammate
          </button>

          <PrimaryButton type="button" className="w-full mt-4" onClick={() => navigate({ to: '/register/welcome' })}>
            {teamMembers.length > 0 ? 'Save & Continue' : 'Continue without team'}
          </PrimaryButton>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <IconLock className="w-[16px] h-[16px] text-on-background-muted" />
            
            <p className="text-on-background-muted text-sm">Your info is safely secured</p>
          </div>
        </form>
      </FormProvider>
    </LoggedOutShell>
  )
}
