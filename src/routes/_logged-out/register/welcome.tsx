import { PrimaryButton } from "#/components/common/buttons/PrimaryButton";
import { SvgSuccess } from "#/components/common/svgs/SvgSuccess";
import AuthenticationUtil from "#/utils/authentication";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useStore } from "zustand";

export const Route = createFileRoute("/_logged-out/register/welcome")({
  component: RegisterWelcomeComponent,
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
      !payload.country ||
      !payload.team
    ) {
      // If any of the required fields are missing, we redirect to the register page.
      
      registrationStore.replacePayload({});
      
      throw redirect({ to: "/register" });
    }
  },
  loader: async ({ context }) => {
    const api = context.api;

    const payload = context.registrationStore.getState().payload;

    const response = await api.register(payload!);

    return response;
  },
});

function RegisterWelcomeComponent() {
  const { registrationStore } = Route.useRouteContext();

  const payload = useStore(registrationStore, (state) => state.payload);

  const navigate = useNavigate();

  const enterApp = () => {
    AuthenticationUtil.setAuthenticated(true);

    navigate({ to: "/" });
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center m-auto">
      <SvgSuccess className="w-[150px] h-[150px] text-primary" />

      <code className="max-w-[400px] wrap-break-word">
        {payload ? JSON.stringify(payload, null, 2) : <div>No payload</div>}
      </code>

      <p className="text-3xl font-bold text-on-background">Success!</p>

      <p className="text-on-background-dimmed text-center max-w-[400px]">
        You have received an email where you can read more about your account
        and setup your password.
      </p>

      <PrimaryButton className="w-full mt-4" onClick={() => enterApp()}>
        Finish
      </PrimaryButton>
    </div>
  );
}
