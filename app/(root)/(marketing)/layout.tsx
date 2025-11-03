import { ReactNode } from 'react';
import 'remixicon/fonts/remixicon.css';
import type { Metadata } from 'next';
import { Navbar } from '@/shared/ui/Navbar';

export const metadata: Metadata = {
  title: 'Boston Private Hire Transport | Reliable Airport & Courier Service',
  description:
    'Professional private hire transport based in Boston, UK. Reliable passenger transfers to airports, embassies, and courier deliveries. Licensed private hire driver offering comfortable and affordable transport solutions.',
  authors: [
    {
      name: 'Przemek Lewtak',
      url: 'https://github.com/matchmakers69',
    },
  ],
  creator: 'Przemek Lewtak',
};

export default function MarketingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col gap-4">{children}</main>
    </>
  );
}
