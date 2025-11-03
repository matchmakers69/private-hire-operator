"use client";

import { type ReactNode } from "react";
import { cn } from "@/shared/utils";
import { usePathname, Link } from "@/i18n/navigation";

export type NavLinkProps = {
	children: ReactNode;
	className?: string;
	href: string;
};

const NavLink = ({
	href,
	children,
	className,
	classNameActive,
	...props
}: NavLinkProps & { classNameActive?: string }) => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		// Dla home page
		if (href === "/") {
			return pathname === "/";
		}
		// Dla innych stron
		return pathname === href || pathname.startsWith(`${href}/`);
	};

	return (
		<Link
			href={href}
			className={cn(
				"focus-visible:ring-ring focus:ring-1 focus:outline-none",
				className,
				isActive(href) && classNameActive,
			)}
			{...props}
		>
			{children}
		</Link>
	);
};

export default NavLink;
