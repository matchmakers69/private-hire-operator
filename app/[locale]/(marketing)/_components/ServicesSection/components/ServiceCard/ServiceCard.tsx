import Image from "next/image";

type ServiceCardProps = {
	image: string;
	title: string;
	description: string;
};

const ServiceCard = ({ image, title, description }: ServiceCardProps) => {
	return (
		<div className="group relative fade-in-top overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
			{/* Image Container */}
			<div className="relative h-72 w-full overflow-hidden">
				<Image
					src={image}
					alt={title}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>

			{/* White Content Box */}
			<div className="bg-white p-8 text-center">
				<h3 className="mb-4 text-text-dark">{title}</h3>
				{description && <p className="mb-6 text-base text-text-muted">{description}</p>}
			</div>
		</div>
	);
};

export default ServiceCard;
