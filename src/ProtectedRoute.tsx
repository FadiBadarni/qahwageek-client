import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'store/store';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRoles?: string[];
}

export const ProtectedRoute = ({
  children,
  requiredRoles = [],
}: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user.data);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If requiredRoles are specified, check if the user has any of the required roles
  if (
    requiredRoles.length > 0 &&
    !user.roles.some((role) => requiredRoles.includes(role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
