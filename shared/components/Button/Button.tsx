import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center min-w-[12rem] leading-none rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      intent: {
        primary:
          "bg-[var(--color-btn-primary)] text-[var(--color-text-dark)] hover:bg-[var(--color-btn-primary-hover)] focus:ring-[var(--color-btn-primary-hover)]",
        secondary:
          "bg-[var(--color-btn-secondary)] text-white hover:bg-[var(--color-btn-secondary-hover)] focus:ring-[var(--color-btn-secondary-hover)]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-16 px-12 text-base",
        lg: "h-20 px-18 text-md",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      rounded: "full",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

function Button({ intent, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(button({ intent, size }), className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
