import type { ButtonHTMLAttributes, ReactNode } from "react";

export type PrimaryButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export function PrimaryButton({
  type = "button",
  onClick,
  children,
  className = '',
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg bg-primary px-4 py-4 text-base font-medium text-on-primary hover:opacity-90 active:opacity-95 ${className}`}
    >
      {children}
    </button>
  );
}
