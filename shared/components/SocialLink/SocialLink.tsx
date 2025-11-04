import { cn } from "@/shared/utils";
import Link from "next/link";

interface SocialLinkProps {
	href: string;
	iconName: string;
	label: string;
	className?: string;
	title?: string;
}

function SocialLink({ href, iconName, label, className, title }: SocialLinkProps) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			title={title}
			className={cn(
				"inline-flex h-14 w-14 items-center justify-center rounded-full bg-(--color-accent-blue) text-white transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none",
				className,
			)}
			aria-label={label}
		>
			<i className={`ri-${iconName} text-lg`} />
		</Link>
	);
}
export default SocialLink;
