'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { NavLink } from '../NavLink';
import { Logo } from '../Logo';
import { PhoneButton } from '@/shared/components/PhoneButton';
import { SocialLink } from '@/shared/components/SocialLink';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYPositionRef = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const difference = y - lastYPositionRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastYPositionRef.current = y;
    }
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile menu - OUTSIDE navbar */}
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 h-full w-64 bg-(--color-secondary) p-6 text-white transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="mt-20 flex flex-col space-y-8">
          <Link
            href="/"
            className="text-lg transition-colors hover:text-(--color-primary)"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg transition-colors hover:text-(--color-primary)"
            onClick={() => setIsOpen(false)}
          >
            About me
          </Link>
        </div>
      </div>

      {/* Navbar */}
      <motion.nav
        transition={{ duration: 0.2 }}
        animate={isHidden ? 'hidden' : 'visible'}
        whileHover="visible"
        onFocusCapture={() => setIsHidden(false)}
        variants={{
          hidden: {
            y: '-90%',
          },
          visible: {
            y: '0%',
          },
        }}
        className="fixed top-0 left-0 z-50 w-screen bg-transparent py-4 shadow-sm lg:py-6"
      >
        <div className="container flex items-center justify-between">
          <div className="nav-left-col flex items-center gap-12">
            <Logo priority linkToHome className="main-logo-image h-auto w-[110px]" />
            <PhoneButton rounded="full" intent="secondary" size="md" showNumber={true} />
          </div>
          <div className="nav-right-col flex items-center gap-4">
            <div className="hidden items-center space-x-4 text-(--color-secondary) md:flex">
              <NavLink
                className="relative flex h-16 items-center justify-center rounded-full border-2 border-transparent bg-transparent px-10 py-3 text-base text-(--color-dark-navy) transition-all duration-200 ease-out select-none hover:bg-(--color-primary) hover:text-white"
                classNameActive="!border-(--color-primary) !bg-transparent !text-(--color-dark-navy)"
                href="/"
              >
                <span className="text-inherit">Home</span>
              </NavLink>

              <NavLink
                className="relative flex h-16 items-center justify-center rounded-full border-2 border-transparent bg-transparent px-10 py-3 text-base text-(--color-dark-navy) transition-all duration-200 ease-out select-none hover:bg-(--color-primary) hover:text-white"
                classNameActive="!border-(--color-primary) !bg-transparent !text-(--color-dark-navy)"
                href="/about"
              >
                <span className="text-inherit">About</span>
              </NavLink>
            </div>
            <div className="social-icons lg:ml-4">
              <SocialLink
                href="https://facebook.com/your-page"
                iconName="facebook-fill"
                label="Visit our Facebook page"
                className="facebook-icon bg-facebook"
              />
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 p-2 text-(--color-dark-navy) focus:outline-none md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;
