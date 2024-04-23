'use client';

import { useEffect } from 'react';

import { useAppStoreActions } from '@/stores';

const useSetIsDesktop = () => {
  const { setIsDesktop } = useAppStoreActions();

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);

    const onWindowResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [setIsDesktop]);
};

export default useSetIsDesktop;
