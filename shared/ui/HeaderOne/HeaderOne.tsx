import { cn } from "@/shared/utils";

type HeaderOneProps = {
	children: React.ReactNode;
	center?: boolean;
	className?: string;
};

function HeaderOne({ children, center, className }: HeaderOneProps) {
	return (
		<h1 className={cn(`text-text-dark leading-tight ${center ? "text-center" : ""}`, className)}>
			{children}
		</h1>
	);
}

export default HeaderOne;
