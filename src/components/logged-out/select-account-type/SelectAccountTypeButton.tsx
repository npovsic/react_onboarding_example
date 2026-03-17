import { IconArrowRight } from "#/components/common/icons/IconArrowRight";
import { Link } from "@tanstack/react-router";

export function SelectAccountTypeButton({
  to,
  title,
  description,
  icon,
}: {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center no-underline! p-8 gap-8 bg-surface rounded-lg shadow-lg hover:bg-surface-primary hover:ring-1 hover:ring-primary transition-all duration-150 outline-none focus-visible:bg-surface-primary focus-visible:ring-1 focus-visible:ring-primary"
    >
      {icon}

      <div className="flex flex-col min-w-0 grow">
        <p className="text-base font-medium text-on-background">{title}</p>
        <p className="text-base text-on-background-dimmed">{description}</p>
      </div>

      <IconArrowRight className="opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 translate-x-[-8px] group-focus-visible:translate-x-0 group-hover:translate-x-0 transition-all duration-150 w-[24px] h-[24px] text-primary" />
    </Link>
  );
}
