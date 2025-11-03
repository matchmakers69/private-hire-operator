import { cn } from '@/shared/utils';
import Link from 'next/link';

interface SocialLinkProps {
  href: string;
  iconName: string;
  label: string;
  className?: string;
}

function SocialLink({ href, iconName, label, className }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-full bg-(--color-accent-blue) text-white transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none',
        className
      )}
      aria-label={label}
    >
      <i className={`ri-${iconName} text-md`} />
    </Link>
  );
}
export default SocialLink;
