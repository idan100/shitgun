import React, { lazy, Suspense } from 'react';

const LazyAddUser = lazy(() => import('./AddUser'));

const AddUser = props => (
  <Suspense fallback={null}>
    <LazyAddUser {...props} />
  </Suspense>
);

export default AddUser;
