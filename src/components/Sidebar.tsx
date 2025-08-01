import React from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Settings, 
  FileText,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ActiveSection } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isCollapsed,
  setIsCollapsed
}) => {
  const { user } = useAuth();

  const canView = user?.perfil === 'Admin' || user?.perfil === 'Gestor' || user?.perfil === 'Visualizador';
  const isAdmin = user?.perfil === 'Admin';

  const menuItems = [
    {
      id: 'dashboard' as ActiveSection,
      label: 'Dashboard',
      icon: BarChart3,
      show: true
    },
    {
      id: 'funcionarios' as ActiveSection,
      label: 'Funcionários',
      icon: Users,
      show: canView
    },
    {
      id: 'treinamentos' as ActiveSection,
      label: 'Treinamentos',
      icon: BookOpen,
      show: canView
    },
    {
      id: 'realizados' as ActiveSection,
      label: 'Realizados',
      icon: GraduationCap,
      show: canView
    },
    {
      id: 'conformidade' as ActiveSection,
      label: 'Conformidade',
      icon: CheckCircle2,
      show: canView
    },
    {
      id: 'obrigatorios' as ActiveSection,
      label: 'Obrigatórios',
      icon: Settings,
      show: isAdmin
    },
    {
      id: 'relatorios' as ActiveSection,
      label: 'Relatórios',
      icon: FileText,
      show: isAdmin
    }
  ];

  return (
    <div className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Treinamentos</h1>
                <p className="text-xs text-gray-500">Sistema de Gestão</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <Shield className="h-8 w-8 text-blue-600 mx-auto" />
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.filter(item => item.show).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'} ${
                    isCollapsed ? 'mx-auto' : ''
                  }`} />
                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.nome.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.nome}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.perfil}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;