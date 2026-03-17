import { SvgSuccess } from "#/components/common/svgs/SvgSuccess";
import AuthenticationUtil from "#/utils/authentication";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

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
    
    AuthenticationUtil.setAuthenticated(true);

    return response;
  },
  pendingComponent: () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center m-auto">
        <h1 className="text-3xl font-bold text-on-background text-center">Creating your account...</h1>
        
        <p className="text-on-background-dimmed text-center">This may take a few seconds.</p>
      </div>
    );
  },
});

function RegisterWelcomeComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    AuthenticationUtil.setAuthenticated(true);
    
    const timeout = setTimeout(() => {
      navigate({ to: "/" });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center m-auto">
      <SvgSuccess className="w-[150px] h-[150px] text-primary" />

      <p className="text-3xl font-bold text-on-background">Success!</p>

      <p className="text-on-background-dimmed text-center max-w-[400px]">
        You have received an email where you can read more about your account
        and setup your password.
      </p>
    </div>
  );
}
