import React, { lazy, Suspense } from 'react';

const LazyCalander = lazy(() => import('./Calander'));

const Calander = props => (
  <Suspense fallback={null}>
    <LazyCalander {...props} />
  </Suspense>
);

export default Calander;
