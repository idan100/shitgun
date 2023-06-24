import React, { lazy, Suspense } from 'react';

const LazyCalanderDialog = lazy(() => import('./CalanderDialog'));

const CalanderDialog = props => (
  <Suspense fallback={null}>
    <LazyCalanderDialog {...props} />
  </Suspense>
);

export default CalanderDialog;
