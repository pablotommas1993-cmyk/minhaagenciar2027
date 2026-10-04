import { useState, useEffect, lazy, Suspense } from 'react';

import GoogleAdsGestao from '@/pages/GoogleAdsGestao';

const Home = lazy(() => import('@/pages/Home'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const CookieBanner = lazy(() => import('@/components/elevare/CookieBanner'));

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
  const isGoogleAds =
    currentPath === '/google-ads/gestao' || currentPath === '/google-ads/gestao/';

  return (
    <>
      {isPrivacy ? (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <PrivacyPolicy />
        </Suspense>
      ) : isGoogleAds ? (
        <GoogleAdsGestao />
      ) : (
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
          <Home />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <CookieBanner />
      </Suspense>
    </>
  );
}
