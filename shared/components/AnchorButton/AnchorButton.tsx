"use client";

import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const anchorButton = cva(
	"inline-flex items-center justify-center leading-none rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
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

export interface AnchorButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof anchorButton> {
	href: string;
}

export function AnchorButton({
	href,
	intent,
	size,
	rounded,
	className,
	children,
	...props
}: AnchorButtonProps) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (href.startsWith("#")) {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={cn(anchorButton({ intent, size, rounded }), className)}
			{...props}
		>
			{children}
		</a>
	);
}

export default AnchorButton;
