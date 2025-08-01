import React, { useState, useEffect } from 'react';
import { X, User, Building2, UserCheck } from 'lucide-react';
import { Funcionario } from '../../types';

interface FuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario?: Funcionario;
  onSave: (funcionario: Omit<Funcionario, 'id'>) => void;
}

const FuncionarioModal: React.FC<FuncionarioModalProps> = ({
  isOpen,
  onClose,
  funcionario,
  onSave
}) => {
  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    cargo: '',
    bu: '',
    cdc: '',
    supervisor: '',
    supervisor2: '',
    bu2: '',
    teamLeader: ''
  });

  useEffect(() => {
    if (funcionario) {
      setFormData({
        matricula: funcionario.matricula,
        nome: funcionario.nome,
        cargo: funcionario.cargo,
        bu: funcionario.bu,
        cdc: funcionario.cdc,
        supervisor: funcionario.supervisor,
        supervisor2: funcionario.supervisor2 || '',
        bu2: funcionario.bu2 || '',
        teamLeader: funcionario.teamLeader
      });
    } else {
      setFormData({
        matricula: '',
        nome: '',
        cargo: '',
        bu: '',
        cdc: '',
        supervisor: '',
        supervisor2: '',
        bu2: '',
        teamLeader: ''
      });
    }
  }, [funcionario, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {funcionario ? 'Editar Funcionário' : 'Novo Funcionário'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Matrícula *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.matricula}
                onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                placeholder="Ex: 001234"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome completo do funcionário"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cargo *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                placeholder="Ex: ELETRICISTA MANUTENCAO I"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="inline h-4 w-4 mr-1" />
                BU *
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.bu}
                onChange={(e) => setFormData({ ...formData, bu: e.target.value })}
              >
                <option value="">Selecione a BU</option>
                <option value="OPERAÇÃO">OPERAÇÃO</option>
                <option value="MANUTENÇÃO">MANUTENÇÃO</option>
                <option value="QUALIDADE">QUALIDADE</option>
                <option value="SEGURANÇA">SEGURANÇA</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CDC *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.cdc}
                onChange={(e) => setFormData({ ...formData, cdc: e.target.value })}
                placeholder="Ex: CDC-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserCheck className="inline h-4 w-4 mr-1" />
                Supervisor *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.supervisor}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                placeholder="Nome do supervisor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supervisor 2
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.supervisor2}
                onChange={(e) => setFormData({ ...formData, supervisor2: e.target.value })}
                placeholder="Nome do supervisor 2 (opcional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BU 2
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.bu2}
                onChange={(e) => setFormData({ ...formData, bu2: e.target.value })}
              >
                <option value="">Selecione a BU 2 (opcional)</option>
                <option value="OPERAÇÃO">OPERAÇÃO</option>
                <option value="MANUTENÇÃO">MANUTENÇÃO</option>
                <option value="QUALIDADE">QUALIDADE</option>
                <option value="SEGURANÇA">SEGURANÇA</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Leader *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.teamLeader}
                onChange={(e) => setFormData({ ...formData, teamLeader: e.target.value })}
                placeholder="Nome do team leader"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              {funcionario ? 'Atualizar' : 'Criar'} Funcionário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuncionarioModal;