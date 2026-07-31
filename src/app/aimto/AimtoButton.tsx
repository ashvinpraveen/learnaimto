import type { AnchorHTMLAttributes, ReactNode } from "react";

type AimtoButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export default function AimtoButton({
  children,
  className = "",
  ...props
}: AimtoButtonProps) {
  return (
    <a className={className} {...props}>
      {children}
    </a>
  );
}
