import { IconArrowRight } from '#/components/common/icons/IconArrowRight'
import { SvgBusinessAccountType } from '#/components/common/svgs/SvgBusinessAccountType'
import { SvgIndividualAccountType } from '#/components/common/svgs/SvgIndividualAccountType'
import { LoggedOutShell } from '#/components/logged-out/LoggedOutShell'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_logged-out/register/')({
  component: RegisterSelectAccountTypeComponent,
})

function RegisterSelectAccountTypeComponent() {
  return (
    <LoggedOutShell
    header={
      <p className="text-on-background-dimmed self-end">Already have an account? <Link to="/login">Login here</Link></p>
    }
    title="Join Us!"
    description="To begin this journey, tell us what type of account you’d be opening."
    >
      <div className="flex flex-col gap-4">
          <Link to="/register/individual" className="flex items-center no-underline! p-8 gap-8 bg-surface rounded-lg shadow-lg hover:bg-surface-primary hover:ring-1 hover:ring-primary transition-all duration-150 outline-none focus-visible:bg-surface-primary focus-visible:ring-1 focus-visible:ring-primary">
            <SvgIndividualAccountType className="w-[52px] h-[52px] text-primary" />
            
            <div className="flex flex-col min-w-0 grow">
              <p className="text-base font-medium text-on-background">Individual</p>
              <p className="text-base text-on-background-dimmed">For you</p>
            </div>
            
            <IconArrowRight className="w-[24px] h-[24px] text-primary" />
          </Link>
          
          <button disabled={true} className="flex items-center text-start p-8 gap-8 bg-surface rounded-lg shadow-lg opacity-50">
            <SvgBusinessAccountType className="w-[52px] h-[52px]" />

            <div className="flex flex-col min-w-0 grow">
              <p className="text-base font-medium text-on-background">Business</p>
              <p className="text-base text-on-background-dimmed">For your business</p>
            </div>
            
            <div className="flex items-center justify-end">
              <p className="text-sm text-on-background-dimmed">Coming soon</p>
            </div>
          </button>
        </div>
    </LoggedOutShell>
  )
}
