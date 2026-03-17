import { IconLock } from "../common/icons/IconLock";

export function InfoSafelySecured() {
  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <IconLock className="w-[16px] h-[16px] text-on-background-muted" />
      
      <p className="text-on-background-muted text-sm">Your info is safely secured</p>
    </div>
  )
}