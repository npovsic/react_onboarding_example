import { SvgBusinessAccountType } from "#/components/common/svgs/SvgBusinessAccountType";
import { SvgIndividualAccountType } from "#/components/common/svgs/SvgIndividualAccountType";
import { LoggedOutShell } from "#/components/logged-out/LoggedOutShell";
import { SelectAccountTypeButton } from "#/components/logged-out/select-account-type/SelectAccountTypeButton";
import { RegistrationAccountType } from "#/types/data/registration";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "zustand";

export const Route = createFileRoute("/_logged-out/register/")({
  component: RegisterSelectAccountTypeComponent,
});

function RegisterSelectAccountTypeComponent() {
  const { registrationStore } = Route.useRouteContext();
  
  const replacePayload = useStore(registrationStore, (state) => state.replacePayload);
  
  return (
    <LoggedOutShell
      header={
        <p className="text-on-background-dimmed self-end">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary no-underline hover:underline"
          >
            Login here
          </Link>
        </p>
      }
      title="Join Us!"
      description="To begin this journey, tell us what type of account you’d be opening."
    >
      <div className="flex flex-col gap-4">
        <SelectAccountTypeButton
          to="/register/account"
          title="Individual"
          description="For you"
          icon={
            <SvgIndividualAccountType className="w-[52px] h-[52px] text-primary" />
          }
          onSelect={() => replacePayload({ accountType: RegistrationAccountType.INDIVIDUAL })}
        />
        
        <SelectAccountTypeButton
          to="/register/account"
          title="Business"
          description="For your business"
          icon={
            <SvgBusinessAccountType className="w-[52px] h-[52px] text-primary" />
          }
          onSelect={() => replacePayload({ accountType: RegistrationAccountType.BUSINESS })}
        />
      </div>
    </LoggedOutShell>
  );
}
