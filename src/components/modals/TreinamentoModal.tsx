import React, { useState, useEffect } from 'react';
import { X, BookOpen, Calendar } from 'lucide-react';
import { Treinamento } from '../../types';

interface TreinamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  treinamento?: Treinamento;
  onSave: (treinamento: Omit<Treinamento, 'id'>) => void;
}

const TreinamentoModal: React.FC<TreinamentoModalProps> = ({
  isOpen,
  onClose,
  treinamento,
  onSave
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    validade: 365
  });

  useEffect(() => {
    if (treinamento) {
      setFormData({
        nome: treinamento.nome,
        descricao: treinamento.descricao || '',
        validade: treinamento.validade
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        validade: 365
      });
    }
  }, [treinamento, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {treinamento ? 'Editar Treinamento' : 'Novo Treinamento'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="inline h-4 w-4 mr-1" />
              Nome do Treinamento *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Ex: NR-10 - Básico"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descrição detalhada do treinamento (opcional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Validade (dias) *
            </label>
            <input
              type="number"
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.validade}
              onChange={(e) => setFormData({ ...formData, validade: parseInt(e.target.value) })}
              placeholder="365"
            />
            <p className="text-xs text-gray-500 mt-1">
              Número de dias que o treinamento permanece válido
            </p>
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
              {treinamento ? 'Atualizar' : 'Criar'} Treinamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreinamentoModal;