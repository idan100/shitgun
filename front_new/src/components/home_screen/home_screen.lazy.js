import React, { lazy, Suspense } from 'react';

const LazyHomeScreen = lazy(() => import('./HomeScreen'));

const HomeScreen = props => (
  <Suspense fallback={null}>
    <LazyHomeScreen {...props} />
  </Suspense>
);

export default HomeScreen;
