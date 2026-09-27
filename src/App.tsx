import { useState, useEffect, lazy, Suspense } from 'react';
import Home from '@/pages/Home';
import CookieBanner from '@/components/elevare/CookieBanner';

const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isPrivacy = currentPath === '/privacidade' || currentPath === '/privacidade/';

  return (
    <>
      {isPrivacy ? (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <PrivacyPolicy />
        </Suspense>
      ) : (
        <Home />
      )}
      <CookieBanner />
    </>
  );
}
