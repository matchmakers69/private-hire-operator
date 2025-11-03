import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const phoneButton = cva(
	"inline-flex items-center justify-center leading-none rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 gap-2",
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
				md: "h-16 px-8 text-base",
				lg: "h-20 px-12 text-md",
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

export interface PhoneButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof phoneButton> {
	phoneNumber?: string;
	showIcon?: boolean;
	showNumber?: boolean;
}

function PhoneButton({
	intent,
	size,
	className,
	phoneNumber = "+447411853262",
	showIcon = true,
	showNumber = true,
	children,
	...props
}: PhoneButtonProps) {
	const displayNumber = phoneNumber.replace(/(\+44)(\d{4})(\d{6})/, "$1 $2 $3");

	return (
		<a
			href={`tel:${phoneNumber}`}
			className={cn(phoneButton({ intent, size }), className)}
			aria-label={`Call ${phoneNumber}`}
			{...props}
		>
			{showIcon && <i className="ri-phone-fill text-[2rem]" />}
			{showNumber && <span>{displayNumber}</span>}
			{children}
		</a>
	);
}

export default PhoneButton;
