'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

const ProgressBarProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="2px" color="#4a5e95" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default ProgressBarProvider;
