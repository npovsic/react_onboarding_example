import { Link } from "@tanstack/react-router"
import { IconChevronLeft } from "../common/icons/IconChevronLeft"

export function OnboardingHeader({
    navigateBackTo,
    currentStep,
    totalSteps,
    title,
}: {
    navigateBackTo: string,
    currentStep: number
    totalSteps: number
    title: string
}) {
  return (
    <div className="flex items-start justify-between gap-2">
        <Link to={navigateBackTo} className="flex items-center gap-2 text-on-background-dimmed hover:underline hover:text-primary">
            <IconChevronLeft className="w-[16px] h-[16px]" />

            <span>Back</span>
        </Link>

        <div className="flex flex-col">
        <p className="text-on-background-muted text-sm text-end">STEP 0{currentStep}/0{totalSteps}</p>
        <p className="text-base font-medium text-on-background-dimmed text-end">
            {title}
        </p>
        </div>
    </div>
  )
}