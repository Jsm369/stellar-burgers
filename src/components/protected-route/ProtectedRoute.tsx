import React from 'react';
import { useSelector, RootState } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  notRequireAuth?: boolean;
  requireAuth?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
  requireAuth = false,
  notRequireAuth = false
}: Props) => {
  const { isInit } = useSelector((store: RootState) => store.user);
  const location = useLocation();

  // if (requireAuth && !isInit) {
  //   return <Navigate to='/login' state={{ from: location }} replace />;
  // }

  // if (notRequireAuth && isInit) {
  //   return <Navigate to='/' replace />;
  // }

  // if (notRequireAuth && !isInit) {
  //   return children;
  // }

  // return children;
  if (!requireAuth && !isInit) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (requireAuth && isInit) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};
