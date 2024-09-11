import React from 'react';
import { useSelector, RootState } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  notRequireAuth?: boolean;
  requireAuth?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children, requireAuth = false }: Props) => {
  const { isInit } = useSelector((store: RootState) => store.user);
  const location = useLocation();

  if (!requireAuth && !isInit) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (requireAuth && isInit) {
    const fromPage = location.state?.from || { pathname: '/' };

    return <Navigate replace to={fromPage} />;
  }
  return children;
};
