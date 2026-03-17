import { createFileRoute, Outlet } from '@tanstack/react-router'
import styles from './route.module.css'
import { IconQuote } from '#/components/common/icons/IconQuote'
import { IconQuoteEnd } from '#/components/common/icons/IconQuoteEnd'
import { SvgOnboardingDots } from '#/components/common/svgs/SvgOnboardingDots'

export const Route = createFileRoute('/_logged-out')({
  component: LoggedOutLayoutComponent,
})

// This is basically the layout for the logged out routes which are all the same.
function LoggedOutLayoutComponent() {
  return (
    <main className="flex min-h-screen">
      <div className={`${styles.onboardingImage} bg-primary w-[45vw] hidden md:flex items-center justify-center py-16 px-8 xl:py-24 xl:px-32`}>
        <div className="flex flex-col relative z-10 max-w-[427px]">
          <SvgOnboardingDots className="w-[60px] h-[56px] text-tertiary self-end mx-8 mb-16" />
          
          <IconQuote className="w-[24px] h-[24px] mb-6 text-secondary" />
          
          <p className="text-on-primary text-xl">
            The passage experienced a surge in popularity during the 1960s when Letraset used 
            it on their dry-transfer sheets, and again during the 90s as desktop publishers 
            bundled the text with their software.
          </p>
          
          <IconQuoteEnd className="w-[32px] h-[32px] mt-16 text-on-primary self-end" />
          
          {/* A small hack to center the text shown above. */}
          <SvgOnboardingDots className="opacity-0 w-[60px] h-[56px] text-tertiary self-end mx-8 mt-16" />
        </div>
      </div>
      
      <div className="onboarding-shell min-w-0 grow py-16 px-8 xl:py-24 xl:px-32">
        <div className="min-h-full flex flex-col">
          <Outlet />
        </div>
      </div>
    </main>
    )
}
