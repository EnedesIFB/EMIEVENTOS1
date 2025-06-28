import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Edit, Trash2, Calendar, Users, BookOpen, Megaphone, LayoutDashboard, ChevronDown, ChevronUp, Search, X } from 'lucide-react';

// Mock Data - Simula os dados que viriam do backend (Django/PostgreSQL)
// Dados extraídos da planilha para maior realismo.
const initialCursos = [
  { id: 1, nome: 'Ensino Médio Integrado em Eventos', modalidade: 'Integrado', carga_horaria: 3200 },
  { id: 2, nome: 'Técnico em Hospedagem', modalidade: 'Subsequente', carga_horaria: 1200 },
  { id: 3, nome: 'Licenciatura em Letras', modalidade: 'Superior', carga_horaria: 2800 },
];

const initialAlunos = [
  { id: 1, nome: 'Ana Carolina Souza', matricula: '202301', data_nascimento: '2007-05-15', email: 'ana.souza@ifb.edu.br', telefone: '61998765432' },
  { id: 2, nome: 'Bruno Martins', matricula: '202302', data_nascimento: '2006-11-22', email: 'bruno.martins@ifb.edu.br', telefone: '61987654321' },
  { id: 3, nome: 'Carla Dias', matricula: '202201', data_nascimento: '2005-02-10', email: 'carla.dias@ifb.edu.br', telefone: '61976543210' },
];

const initialEventos = [
  { id: 1, nome: 'Acolhida aos estudantes', data_evento: '2025-01-20', descricao: 'Recepção dos novos e antigos alunos para o início do ano letivo.', local: 'Auditório Principal', status: 'Planejado' },
  { id: 2, nome: 'Semana de Arte e Cultura', data_evento: '2025-04-15', descricao: 'Exposições, apresentações e oficinas culturais.', local: 'Campus', status: 'Planejado' },
  { id: 3, nome: 'Feira de Ciências e Tecnologia', data_evento: '2025-09-05', descricao: 'Apresentação de projetos desenvolvidos pelos alunos.', local: 'Ginásio', status: 'Concluído' },
];

const initialPlanosMidia = [
  { id: 1, evento_id: 1, canal: 'Instagram', data_publicacao: '2025-01-10', conteudo: 'Post "Save the Date" sobre a acolhida.', responsavel: 'Equipe de Comunicação', status: 'Concluído', observacoes: 'Alto engajamento.' },
  { id: 2, evento_id: 1, canal: 'Site IFB', data_publicacao: '2025-01-12', conteudo: 'Matéria completa com a programação.', responsavel: 'Jornalista', status: 'Pendente', observacoes: '' },
  { id: 3, evento_id: 1, canal: 'E-mail', data_publicacao: '2025-01-15', conteudo: 'E-mail marketing para a base de alunos.', responsavel: 'Estagiário', status: 'Pendente', observacoes: '' },
  { id: 4, evento_id: 2, canal: 'Facebook', data_publicacao: '2025-03-20', conteudo: 'Criar evento no Facebook e convidar público.', responsavel: 'Equipe de Comunicação', status: 'Planejado', observacoes: '' },
  { id: 5, evento_id: 3, canal: 'Imprensa', data_publicacao: '2025-08-25', conteudo: 'Enviar press release para jornais locais.', responsavel: 'Assessor de Imprensa', status: 'Concluído', observacoes: 'Saiu nota no Correio Braziliense.' },
];

// Componente de Ícone para Status
const StatusBadge = ({ status }) => {
  const statusColors = {
    'Pendente': 'bg-yellow-100 text-yellow-800',
    'Concluído': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-red-100 text-red-800',
    'Planejado': 'bg-blue-100 text-blue-800',
    'Em Andamento': 'bg-indigo-100 text-indigo-800',
  };
  return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

// Componente Modal Genérico
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

// Componente do Dashboard
const Dashboard = ({ setActivePage }) => {
  const mediaStatusData = initialPlanosMidia.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  
  const pieData = Object.keys(mediaStatusData).map(key => ({ name: key, value: mediaStatusData[key] }));
  const COLORS = { 'Concluído': '#10B981', 'Pendente': '#F59E0B', 'Planejado': '#3B82F6', 'Cancelado': '#EF4444' };

  const academicPerformanceData = [
    { name: 'Turma A', media: 8.5 },
    { name: 'Turma B', media: 7.2 },
    { name: 'Turma C', media: 9.1 },
    { name: 'Turma D', media: 6.8 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePage('Cursos')}>
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total de Cursos</p>
              <p className="text-2xl font-bold text-gray-800">{initialCursos.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePage('Alunos')}>
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total de Alunos</p>
              <p className="text-2xl font-bold text-gray-800">{initialAlunos.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePage('Eventos')}>
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Próximos Eventos</p>
              <p className="text-2xl font-bold text-gray-800">{initialEventos.filter(e => e.status !== 'Concluído').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActivePage('Eventos')}>
          <div className="flex items-center">
            <Megaphone className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Ações de Mídia Pendentes</p>
              <p className="text-2xl font-bold text-gray-800">{initialPlanosMidia.filter(p => p.status === 'Pendente').length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Status das Ações de Mídia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Desempenho Académico (Média por Turma)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={academicPerformanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="media" fill="#82ca9d" name="Média da Turma" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Componente Genérico para CRUD
const CrudPage = ({ title, icon, items, setItems, formFields, renderItem, initialFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData(initialFormData);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setItems(items.map(item => item.id === editingId ? { ...formData, id: editingId } : item));
    } else {
      setItems([...items, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem a certeza que deseja excluir este item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const filteredItems = items.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {icon}
          <h1 className="text-3xl font-bold text-gray-800 ml-3">{title}</h1>
        </div>
        <button onClick={() => handleOpenModal()} className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          <Plus size={20} className="mr-2" />
          Adicionar Novo
        </button>
      </div>
      
      <div className="mb-4 relative">
        <input 
          type="text"
          placeholder={`Procurar em ${title.toLowerCase()}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {formFields.map(field => (
                <th key={field.name} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{field.label}</th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map(item => renderItem(item, handleOpenModal, handleDelete))}
          </tbody>
        </table>
         {filteredItems.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <p>Nenhum item encontrado.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl font-bold mb-6">{editingId ? 'Editar' : 'Adicionar'} {title.slice(0, -1)}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formFields.map(field => (
              <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {field.options.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows="3"
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={handleCloseModal} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Componente para a página de Eventos e Plano de Mídia
const EventosPage = () => {
  const [eventos, setEventos] = useState(initialEventos);
  const [planosMidia, setPlanosMidia] = useState(initialPlanosMidia);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isMidiaModalOpen, setIsMidiaModalOpen] = useState(false);
  const [currentEventIdForMidia, setCurrentEventIdForMidia] = useState(null);
  
  const [eventFormData, setEventFormData] = useState({ nome: '', data_evento: '', descricao: '', local: '', status: 'Planejado' });
  const [midiaFormData, setMidiaFormData] = useState({ evento_id: null, canal: '', data_publicacao: '', conteudo: '', responsavel: '', status: 'Pendente', observacoes: '' });
  
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingMidiaId, setEditingMidiaId] = useState(null);

  // Funções para CRUD de Eventos
  const handleEventInputChange = (e) => setEventFormData({ ...eventFormData, [e.target.name]: e.target.value });
  const handleOpenEventModal = (item = null) => {
    if (item) {
      setEventFormData(item);
      setEditingEventId(item.id);
    } else {
      setEventFormData({ nome: '', data_evento: '', descricao: '', local: '', status: 'Planejado' });
      setEditingEventId(null);
    }
    setIsEventModalOpen(true);
  };
  const handleCloseEventModal = () => setIsEventModalOpen(false);
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (editingEventId) {
      setEventos(eventos.map(ev => ev.id === editingEventId ? { ...eventFormData, id: editingEventId } : ev));
    } else {
      setEventos([...eventos, { ...eventFormData, id: Date.now() }]);
    }
    handleCloseEventModal();
  };
  const handleEventDelete = (id) => {
    if (window.confirm('Tem a certeza que deseja excluir este evento e todos os seus planos de mídia associados?')) {
      setEventos(eventos.filter(ev => ev.id !== id));
      setPlanosMidia(planosMidia.filter(pm => pm.evento_id !== id));
    }
  };

  // Funções para CRUD de Plano de Mídia
  const handleMidiaInputChange = (e) => setMidiaFormData({ ...midiaFormData, [e.target.name]: e.target.value });
  const handleOpenMidiaModal = (eventoId, midiaItem = null) => {
    setCurrentEventIdForMidia(eventoId);
    if (midiaItem) {
      setMidiaFormData(midiaItem);
      setEditingMidiaId(midiaItem.id);
    } else {
      setMidiaFormData({ evento_id: eventoId, canal: '', data_publicacao: '', conteudo: '', responsavel: '', status: 'Pendente', observacoes: '' });
      setEditingMidiaId(null);
    }
    setIsMidiaModalOpen(true);
  };
  const handleCloseMidiaModal = () => setIsMidiaModalOpen(false);
  const handleMidiaSubmit = (e) => {
    e.preventDefault();
    if (editingMidiaId) {
      setPlanosMidia(planosMidia.map(pm => pm.id === editingMidiaId ? { ...midiaFormData, id: editingMidiaId } : pm));
    } else {
      setPlanosMidia([...planosMidia, { ...midiaFormData, id: Date.now(), evento_id: currentEventIdForMidia }]);
    }
    handleCloseMidiaModal();
  };
  const handleMidiaDelete = (id) => {
    if (window.confirm('Tem a certeza que deseja excluir esta ação de mídia?')) {
      setPlanosMidia(planosMidia.filter(pm => pm.id !== id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-gray-800 ml-3">Eventos e Planos de Mídia</h1>
        </div>
        <button onClick={() => handleOpenEventModal()} className="flex items-center bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
          <Plus size={20} className="mr-2" />
          Adicionar Evento
        </button>
      </div>

      <div className="space-y-4">
        {eventos.map(evento => (
          <div key={evento.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleExpand(evento.id)}>
              <div className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="text-lg font-bold text-purple-800">{evento.nome}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <span><strong className="font-semibold">Data:</strong> {new Date(evento.data_evento + 'T03:00:00Z').toLocaleDateString('pt-BR')}</span>
                      <span><strong className="font-semibold">Local:</strong> {evento.local}</span>
                      <span><strong className="font-semibold">Status:</strong> <StatusBadge status={evento.status} /></span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                   <button onClick={(e) => { e.stopPropagation(); handleOpenEventModal(evento); }} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full"><Edit size={18} /></button>
                   <button onClick={(e) => { e.stopPropagation(); handleEventDelete(evento.id); }} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><Trash2 size={18} /></button>
                   {expandedEventId === evento.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </div>
            {expandedEventId === evento.id && (
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-md font-semibold text-gray-700">Plano de Mídia</h3>
                  <button onClick={() => handleOpenMidiaModal(evento.id)} className="flex items-center bg-green-500 text-white text-sm font-bold py-1 px-3 rounded-lg hover:bg-green-600">
                    <Plus size={16} className="mr-1" />
                    Adicionar Ação
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Pub.</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conteúdo</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsável</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {planosMidia.filter(pm => pm.evento_id === evento.id).map(midia => (
                        <tr key={midia.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{midia.canal}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(midia.data_publicacao + 'T03:00:00Z').toLocaleDateString('pt-BR')}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">{midia.conteudo}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{midia.responsavel}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm"><StatusBadge status={midia.status} /></td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                            <button onClick={() => handleOpenMidiaModal(evento.id, midia)} className="text-blue-600 hover:text-blue-900">Editar</button>
                            <button onClick={() => handleMidiaDelete(midia.id)} className="text-red-600 hover:text-red-900">Excluir</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {planosMidia.filter(pm => pm.evento_id === evento.id).length === 0 && (
                      <p className="text-center py-4 text-sm text-gray-500">Nenhuma ação de mídia registada para este evento.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de Evento */}
      <Modal isOpen={isEventModalOpen} onClose={handleCloseEventModal}>
        <h2 className="text-2xl font-bold mb-6">{editingEventId ? 'Editar' : 'Adicionar'} Evento</h2>
        <form onSubmit={handleEventSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Evento</label>
            <input type="text" name="nome" value={eventFormData.nome} onChange={handleEventInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data do Evento</label>
              <input type="date" name="data_evento" value={eventFormData.data_evento} onChange={handleEventInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Local</label>
              <input type="text" name="local" value={eventFormData.local} onChange={handleEventInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea name="descricao" rows="3" value={eventFormData.descricao} onChange={handleEventInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" value={eventFormData.status} onChange={handleEventInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option>Planejado</option>
              <option>Em Andamento</option>
              <option>Concluído</option>
              <option>Cancelado</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={handleCloseEventModal} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600">Guardar Evento</button>
          </div>
        </form>
      </Modal>

      {/* Modal de Plano de Mídia */}
      <Modal isOpen={isMidiaModalOpen} onClose={handleCloseMidiaModal}>
        <h2 className="text-2xl font-bold mb-6">{editingMidiaId ? 'Editar' : 'Adicionar'} Ação de Mídia</h2>
        <form onSubmit={handleMidiaSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Canal de Comunicação</label>
              <input type="text" name="canal" value={midiaFormData.canal} onChange={handleMidiaInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Publicação</label>
              <input type="date" name="data_publicacao" value={midiaFormData.data_publicacao} onChange={handleMidiaInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conteúdo / Briefing</label>
            <textarea name="conteudo" rows="3" value={midiaFormData.conteudo} onChange={handleMidiaInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Responsável</label>
              <input type="text" name="responsavel" value={midiaFormData.responsavel} onChange={handleMidiaInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={midiaFormData.status} onChange={handleMidiaInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                <option>Pendente</option>
                <option>Concluído</option>
                <option>Cancelado</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Observações</label>
            <textarea name="observacoes" rows="2" value={midiaFormData.observacoes} onChange={handleMidiaInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={handleCloseMidiaModal} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Guardar Ação</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


// Componente Principal da Aplicação
export default function App() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [cursos, setCursos] = useState(initialCursos);
  const [alunos, setAlunos] = useState(initialAlunos);

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'Cursos':
        return <CrudPage
          title="Cursos"
          icon={<BookOpen className="h-8 w-8 text-blue-500" />}
          items={cursos}
          setItems={setCursos}
          initialFormData={{ nome: '', modalidade: '', carga_horaria: '' }}
          formFields={[
            { name: 'nome', label: 'Nome do Curso', type: 'text' },
            { name: 'modalidade', label: 'Modalidade', type: 'text' },
            { name: 'carga_horaria', label: 'Carga Horária', type: 'number' },
          ]}
          renderItem={(item, onEdit, onDelete) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.modalidade}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.carga_horaria}h</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-900">Editar</button>
                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900">Excluir</button>
              </td>
            </tr>
          )}
        />;
      case 'Alunos':
        return <CrudPage
          title="Alunos"
          icon={<Users className="h-8 w-8 text-green-500" />}
          items={alunos}
          setItems={setAlunos}
          initialFormData={{ nome: '', matricula: '', data_nascimento: '', email: '', telefone: '' }}
          formFields={[
            { name: 'nome', label: 'Nome Completo', type: 'text' },
            { name: 'matricula', label: 'Matrícula', type: 'text' },
            { name: 'data_nascimento', label: 'Data de Nascimento', type: 'date' },
            { name: 'email', label: 'E-mail', type: 'email' },
            { name: 'telefone', label: 'Telefone', type: 'tel' },
          ]}
          renderItem={(item, onEdit, onDelete) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.matricula}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.data_nascimento + 'T03:00:00Z').toLocaleDateString('pt-BR')}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.telefone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-900">Editar</button>
                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-900">Excluir</button>
              </td>
            </tr>
          )}
        />;
      case 'Eventos':
        return <EventosPage />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };
  
  const NavLink = ({ pageName, icon, children }) => (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); setActivePage(pageName); }}
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        activePage === pageName
          ? 'bg-blue-600 text-white'
          : 'text-gray-200 hover:bg-blue-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{children}</span>
    </a>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-blue-800">
          <BookOpen size={28} className="text-white" />
          <h1 className="text-xl font-bold ml-2">Gestão Académica</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavLink pageName="Dashboard" icon={<LayoutDashboard size={20} />}>Dashboard</NavLink>
          <NavLink pageName="Cursos" icon={<BookOpen size={20} />}>Gestão de Cursos</NavLink>
          <NavLink pageName="Alunos" icon={<Users size={20} />}>Gestão de Alunos</NavLink>
          <NavLink pageName="Eventos" icon={<Calendar size={20} />}>Eventos & Mídia</NavLink>
          {/* Adicionar outros links aqui: Matrículas, Avaliações, etc. */}
        </nav>
        <div className="p-4 border-t border-blue-800">
          <p className="text-sm text-center text-blue-300">© 2025 IFB</p>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
}
