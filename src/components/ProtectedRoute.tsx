import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'Admin' | 'Gestor' | 'Visualizador';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return null; // This will show the login form
  }

  if (requiredRole) {
    const roleHierarchy = { 'Admin': 3, 'Gestor': 2, 'Visualizador': 1 };
    const userLevel = roleHierarchy[user.perfil];
    const requiredLevel = roleHierarchy[requiredRole];

    if (userLevel < requiredLevel) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Acesso Negado</h3>
            <p className="text-gray-600">
              Você não tem permissão para acessar esta funcionalidade.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Seu perfil: <span className="font-medium">{user.perfil}</span>
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;