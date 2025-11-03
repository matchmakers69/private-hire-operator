import Image from 'next/image';
import Link from 'next/link';

function Logo({ width = 120, height = 80, className = '', priority = true, linkToHome = true }) {
  const logoImage = (
    <Image
      src="/logos/logo.svg"
      alt="Private Hire Operator in Boston Logo"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
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
