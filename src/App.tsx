import { useState, useEffect, lazy, Suspense } from 'react';

import GoogleAdsGestao from '@/pages/GoogleAdsGestao';

const Nova = lazy(() => import('@/pages/Nova'));
const Home = lazy(() => import('@/pages/Home'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const CookieBanner = lazy(() => import('@/components/elevare/CookieBanner'));

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isPrivacy = currentPath === '/privacidade' || currentPath === '/privacidade/';
  const isGoogleAds =
    currentPath === '/google-ads/gestao' || currentPath === '/google-ads/gestao/';
  const isNova = currentPath === '/nova' || currentPath === '/nova/';

  return (
    <>
      {isPrivacy ? (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <PrivacyPolicy />
        </Suspense>
      ) : isGoogleAds ? (
        <GoogleAdsGestao />
      ) : isNova ? (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <Nova />
        </Suspense>
      ) : (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <Home />
        </Suspense>
      )}
      {mounted && (
        <Suspense fallback={null}>
          <CookieBanner />
        </Suspense>
      )}
    </>
  );
}
