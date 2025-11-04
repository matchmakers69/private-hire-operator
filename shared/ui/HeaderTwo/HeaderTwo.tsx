import { cn } from "@/shared/utils";

type HeaderOneProps = {
	children: React.ReactNode;
	center?: boolean;
	className?: string;
};

function HeaderTwo({ children, center, className }: HeaderOneProps) {
	return (
		<h2 className={cn(`text-text-dark leading-tight ${center ? "text-center" : ""}`, className)}>
			{children}
		</h2>
	);
}

export default HeaderTwo;
