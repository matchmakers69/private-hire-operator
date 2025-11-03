import Image from "next/image";
import Link from "next/link";

type LogoProps = {
	width?: number;
	height?: number;
	className?: string;
	priority?: boolean;
	linkToHome?: boolean;
	alt?: string;
	src: string;
};

function Logo({
	width = 120,
	height = 80,
	className = "",
	priority = true,
	linkToHome = true,
	src,
	alt = "Private Hire Operator in Boston Logo",
}: LogoProps) {
	const logoImage = (
		<Image src={src} alt={alt} width={width} height={height} priority={priority} className={className} />
	);

	if (linkToHome) {
		return (
			<Link href="/" className="inline-block">
				{logoImage}
			</Link>
		);
	}

	return logoImage;
}
export default Logo;
