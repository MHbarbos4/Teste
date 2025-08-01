export interface User {
  id: number;
  email: string;
  nome: string;
  perfil: 'Admin' | 'Gestor' | 'Visualizador';
  token?: string;
}

export interface Funcionario {
  id: number;
  matricula: string;
  nome: string;
  cargo: string;
  bu: string;
  cdc: string;
  supervisor: string;
  supervisor2?: string;
  bu2?: string;
  teamLeader: string;
}

export interface Treinamento {
  id: number;
  nome: string;
  descricao?: string;
  validade: number; // dias
}

export interface TreinamentoRealizado {
  id: number;
  funcionarioId: number;
  treinamentoId: number;
  funcionarioNome: string;
  treinamentoNome: string;
  dataRealizacao: string;
  dataValidade: string;
  situacao: 'Em dia' | 'Vencido' | 'Vencendo';
  diasAVencer: number;
}

export interface TreinamentoObrigatorio {
  id: number;
  funcao: string;
  treinamentoId: number;
  treinamentoNome: string;
}

export interface ConformidadeData {
  funcionarioId: number;
  funcionarioNome: string;
  cargo: string;
  bu: string;
  treinamentosObrigatorios: number;
  treinamentosEmDia: number;
  treinamentosVencidos: number;
  percentualConformidade: number;
}

export type ActiveSection = 'dashboard' | 'funcionarios' | 'treinamentos' | 'realizados' | 'conformidade' | 'obrigatorios' | 'relatorios';