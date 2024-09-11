import React from 'react';
import { useSelector, RootState } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  isAuth?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children, isAuth = false }: Props) => {
  const { isInit } = useSelector((store: RootState) => store.user);
  const location = useLocation();

  console.log(isInit, ':init', isAuth, ':auth');

  if (!isAuth && !isInit) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (isAuth && isInit) {
    return <Navigate to='/' replace />;
  }

  return children;
};
