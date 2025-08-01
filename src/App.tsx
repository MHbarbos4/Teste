import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import UserMenu from './components/UserMenu';
import Sidebar from './components/Sidebar';
import FuncionarioModal from './components/modals/FuncionarioModal';
import TreinamentoModal from './components/modals/TreinamentoModal';
import { 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar,
  Plus,
  Search,
  Filter,
  BarChart3,
  User,
  Building2,
  BookOpen,
  Clock,
  Shield,
  FileText,
  Settings,
  Download,
  Upload
} from 'lucide-react';
import { ActiveSection, Funcionario, Treinamento, TreinamentoRealizado } from './types';

// Mock data
const mockFuncionarios: Funcionario[] = [
  {
    id: 1,
    matricula: '001234',
    nome: 'João Silva Santos',
    cargo: 'ELETRICISTA MANUTENCAO I',
    bu: 'OPERAÇÃO',
    cdc: 'CDC-001',
    supervisor: 'Carlos Mendes',
    teamLeader: 'Ana Costa'
  },
  {
    id: 2,
    matricula: '001235',
    nome: 'Maria Oliveira',
    cargo: 'MECANICO MANUTENCAO II',
    bu: 'MANUTENÇÃO',
    cdc: 'CDC-002',
    supervisor: 'Roberto Lima',
    teamLeader: 'Pedro Santos'
  },
  {
    id: 3,
    matricula: '001236',
    nome: 'Carlos Eduardo',
    cargo: 'SOLDADOR',
    bu: 'OPERAÇÃO',
    cdc: 'CDC-001',
    supervisor: 'Carlos Mendes',
    teamLeader: 'Ana Costa'
  }
];

const mockTreinamentos: Treinamento[] = [
  { id: 1, nome: 'NR-10 - Básico', descricao: 'Segurança em instalações e serviços em eletricidade', validade: 365 },
  { id: 2, nome: 'NR-33 - Espaços Confinados', descricao: 'Segurança e saúde nos trabalhos em espaços confinados', validade: 365 },
  { id: 3, nome: 'NR-35 - Trabalho em Altura', descricao: 'Trabalho em altura', validade: 365 },
  { id: 4, nome: 'NR-12 - Segurança no Trabalho em Máquinas', descricao: 'Segurança no trabalho em máquinas e equipamentos', validade: 365 }
];

const mockTreinamentosRealizados: TreinamentoRealizado[] = [
  {
    id: 1,
    funcionarioId: 1,
    treinamentoId: 1,
    funcionarioNome: 'João Silva Santos',
    treinamentoNome: 'NR-10 - Básico',
    dataRealizacao: '2024-01-15',
    dataValidade: '2025-01-15',
    situacao: 'Em dia',
    diasAVencer: 45
  },
  {
    id: 2,
    funcionarioId: 1,
    treinamentoId: 2,
    funcionarioNome: 'João Silva Santos',
    treinamentoNome: 'NR-33 - Espaços Confinados',
    dataRealizacao: '2023-06-10',
    dataValidade: '2024-06-10',
    situacao: 'Vencido',
    diasAVencer: -180
  },
  {
    id: 3,
    funcionarioId: 2,
    treinamentoId: 1,
    funcionarioNome: 'Maria Oliveira',
    treinamentoNome: 'NR-10 - Básico',
    dataRealizacao: '2024-03-20',
    dataValidade: '2025-03-20',
    situacao: 'Em dia',
    diasAVencer: 120
  }
];

function MainApp() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [funcionarioModalOpen, setFuncionarioModalOpen] = useState(false);
  const [treinamentoModalOpen, setTreinamentoModalOpen] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | undefined>();
  const [selectedTreinamento, setSelectedTreinamento] = useState<Treinamento | undefined>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Stats calculations
  const totalFuncionarios = mockFuncionarios.length;
  const totalTreinamentos = mockTreinamentos.length;
  const treinamentosEmDia = mockTreinamentosRealizados.filter(t => t.situacao === 'Em dia').length;
  const treinamentosVencidos = mockTreinamentosRealizados.filter(t => t.situacao === 'Vencido').length;
  const conformidadePercentual = Math.round((treinamentosEmDia / mockTreinamentosRealizados.length) * 100);

  const canEdit = user?.perfil === 'Admin' || user?.perfil === 'Gestor';
  const canView = user?.perfil === 'Admin' || user?.perfil === 'Gestor' || user?.perfil === 'Visualizador';

  const handleSaveFuncionario = (funcionarioData: Omit<Funcionario, 'id'>) => {
    console.log('Salvando funcionário:', funcionarioData);
    // Here you would call your API
  };

  const handleSaveTreinamento = (treinamentoData: Omit<Treinamento, 'id'>) => {
    console.log('Salvando treinamento:', treinamentoData);
    // Here you would call your API
  };

  const renderTopBar = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-900 capitalize">
          {activeSection === 'realizados' ? 'Treinamentos Realizados' : activeSection}
        </h2>
      </div>
      <UserMenu />
    </header>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Funcionários</p>
              <p className="text-3xl font-bold text-gray-900">{totalFuncionarios}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Treinamentos</p>
              <p className="text-3xl font-bold text-gray-900">{totalTreinamentos}</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Dia</p>
              <p className="text-3xl font-bold text-green-600">{treinamentosEmDia}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vencidos</p>
              <p className="text-3xl font-bold text-red-600">{treinamentosVencidos}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conformidade Geral</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={conformidadePercentual >= 80 ? "#10B981" : conformidadePercentual >= 60 ? "#F59E0B" : "#EF4444"}
                  strokeWidth="3"
                  strokeDasharray={`${conformidadePercentual}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{conformidadePercentual}%</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Taxa de conformidade dos treinamentos obrigatórios
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Vencimentos</h3>
          <div className="space-y-3">
            {mockTreinamentosRealizados
              .filter(t => t.situacao === 'Em dia' && t.diasAVencer <= 60)
              .map(treinamento => (
                <div key={treinamento.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{treinamento.funcionarioNome}</p>
                      <p className="text-xs text-gray-600">{treinamento.treinamentoNome}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">
                    {treinamento.diasAVencer} dias
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo por BU</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900">OPERAÇÃO</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
                <p className="text-xs text-blue-700">funcionários</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">MANUTENÇÃO</p>
                <p className="text-2xl font-bold text-green-600">1</p>
                <p className="text-xs text-green-700">funcionário</p>
              </div>
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFuncionarios = () => (
    <ProtectedRoute requiredRole="Gestor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Funcionários</h2>
          {canEdit && (
            <div className="flex space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Importar</span>
              </button>
              <button 
                onClick={() => {
                  setSelectedFuncionario(undefined);
                  setFuncionarioModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Funcionário</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por matrícula, nome, cargo ou BU..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matrícula
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cargo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    BU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CDC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supervisor
                  </th>
                  {canEdit && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockFuncionarios.map((funcionario) => (
                  <tr key={funcionario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {funcionario.matricula}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {funcionario.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {funcionario.cargo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {funcionario.bu}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {funcionario.cdc}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {funcionario.supervisor}
                    </td>
                    {canEdit && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => {
                            setSelectedFuncionario(funcionario);
                            setFuncionarioModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-900">Excluir</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );

  const renderTreinamentos = () => (
    <ProtectedRoute requiredRole="Gestor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Treinamentos</h2>
          {canEdit && (
            <button 
              onClick={() => {
                setSelectedTreinamento(undefined);
                setTreinamentoModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Treinamento</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTreinamentos.map((treinamento) => (
            <div key={treinamento.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-sm text-gray-500">ID: {treinamento.id}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{treinamento.nome}</h3>
              <p className="text-sm text-gray-600 mb-3">{treinamento.descricao}</p>
              <p className="text-xs text-gray-500 mb-4">Validade: {treinamento.validade} dias</p>
              <div className="flex space-x-2">
                {canEdit && (
                  <button 
                    onClick={() => {
                      setSelectedTreinamento(treinamento);
                      setTreinamentoModalOpen(true);
                    }}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Editar
                  </button>
                )}
                <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm">
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );

  const renderTreinamentosRealizados = () => (
    <ProtectedRoute requiredRole="Gestor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Treinamentos Realizados</h2>
          {canEdit && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Registrar Treinamento</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por funcionário ou treinamento..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Todas as situações</option>
                <option value="em-dia">Em dia</option>
                <option value="vencido">Vencido</option>
                <option value="vencendo">Vencendo</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funcionário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Treinamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Realização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Validade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Situação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dias a Vencer
                  </th>
                  {canEdit && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTreinamentosRealizados.map((registro) => (
                  <tr key={registro.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {registro.funcionarioNome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {registro.treinamentoNome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(registro.dataRealizacao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(registro.dataValidade).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        registro.situacao === 'Em dia' 
                          ? 'bg-green-100 text-green-800'
                          : registro.situacao === 'Vencido'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {registro.situacao}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={registro.diasAVencer < 0 ? 'text-red-600 font-medium' : registro.diasAVencer <= 30 ? 'text-yellow-600 font-medium' : 'text-green-600'}>
                        {registro.diasAVencer > 0 ? `${registro.diasAVencer} dias` : `${Math.abs(registro.diasAVencer)} dias atrás`}
                      </span>
                    </td>
                    {canEdit && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Renovar</button>
                        <button className="text-gray-600 hover:text-gray-900">Detalhes</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );

  const renderConformidade = () => (
    <ProtectedRoute requiredRole="Gestor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Relatório de Conformidade</h2>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Todas as BUs</option>
              <option value="operacao">OPERAÇÃO</option>
              <option value="manutencao">MANUTENÇÃO</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Funcionários com Pendências</h3>
              <div className="space-y-4">
                {mockFuncionarios.map((funcionario) => {
                  const treinamentosVencidos = mockTreinamentosRealizados.filter(
                    t => t.funcionarioId === funcionario.id && t.situacao === 'Vencido'
                  );
                  
                  if (treinamentosVencidos.length === 0) return null;
                  
                  return (
                    <div key={funcionario.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{funcionario.nome}</p>
                            <p className="text-xs text-gray-600">{funcionario.cargo} - {funcionario.bu}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {treinamentosVencidos.length} vencido{treinamentosVencidos.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="mt-3 pl-8">
                        {treinamentosVencidos.map((treinamento) => (
                          <div key={treinamento.id} className="text-xs text-red-700 mb-1">
                            • {treinamento.treinamentoNome} - Vencido há {Math.abs(treinamento.diasAVencer)} dias
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Geral</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total de Funcionários</span>
                  <span className="font-medium text-gray-900">{totalFuncionarios}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Treinamentos em Dia</span>
                  <span className="font-medium text-green-600">{treinamentosEmDia}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Treinamentos Vencidos</span>
                  <span className="font-medium text-red-600">{treinamentosVencidos}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Taxa de Conformidade</span>
                    <span className={`font-bold ${conformidadePercentual >= 80 ? 'text-green-600' : conformidadePercentual >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {conformidadePercentual}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Recomendadas</h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Renovações Urgentes</p>
                      <p className="text-xs text-yellow-700">1 treinamento vencido precisa ser renovado</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Próximos Vencimentos</p>
                      <p className="text-xs text-blue-700">Agendar renovações para próximos 60 dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );

  const renderObrigatorios = () => (
    <ProtectedRoute requiredRole="Admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Treinamentos Obrigatórios por Função</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nova Obrigatoriedade</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-center py-8">
            Funcionalidade em desenvolvimento - Matriz de obrigatoriedade por função
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );

  const renderRelatorios = () => (
    <ProtectedRoute requiredRole="Admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Relatórios Avançados</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <FileText className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Relatório Completo</h3>
            <p className="text-sm text-gray-600 mb-4">Relatório detalhado de todos os funcionários e treinamentos</p>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Gerar Relatório
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <BarChart3 className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Executivo</h3>
            <p className="text-sm text-gray-600 mb-4">Métricas e indicadores para gestão executiva</p>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Visualizar
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Não Conformidades</h3>
            <p className="text-sm text-gray-600 mb-4">Relatório de treinamentos vencidos e pendências</p>
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'funcionarios':
        return renderFuncionarios();
      case 'treinamentos':
        return renderTreinamentos();
      case 'realizados':
        return renderTreinamentosRealizados();
      case 'conformidade':
        return renderConformidade();
      case 'obrigatorios':
        return renderObrigatorios();
      case 'relatorios':
        return renderRelatorios();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        {renderTopBar()}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <FuncionarioModal
        isOpen={funcionarioModalOpen}
        onClose={() => setFuncionarioModalOpen(false)}
        funcionario={selectedFuncionario}
        onSave={handleSaveFuncionario}
      />

      <TreinamentoModal
        isOpen={treinamentoModalOpen}
        onClose={() => setTreinamentoModalOpen(false)}
        treinamento={selectedTreinamento}
        onSave={handleSaveTreinamento}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <MainApp />;
}

export default App;