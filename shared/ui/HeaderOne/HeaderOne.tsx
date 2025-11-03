import { cn } from "@/shared/utils";

type HeaderOneProps = {
	children: React.ReactNode;
	center?: boolean;
	className?: string;
};

function HeaderOne({ children, center, className }: HeaderOneProps) {
	return (
		<h1
			className={cn(
				`text-text-dark text-[3rem] leading-tight md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] ${center ? "text-center" : ""}`,
				className,
			)}
		>
			{children}
		</h1>
	);
}

export default HeaderOne;
