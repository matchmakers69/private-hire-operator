import { cn } from "@/shared/utils";

type HeaderOneProps = {
	children: React.ReactNode;
	center?: boolean;
	className?: string;
};

function HeaderTwo({ children, center, className }: HeaderOneProps) {
	return (
		<h2
			className={cn(
				`text-text-dark text-[2.6rem] leading-tight md:text-[3rem] lg:text-[3.4rem] xl:text-[4rem] 2xl:text-[4.5rem] ${center ? "text-center" : ""}`,
				className,
			)}
		>
			{children}
		</h2>
	);
}

export default HeaderTwo;
