// src/pages/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface ResponseData {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<ResponseData[]>([]);
  const [filter, setFilter] = useState<string>('');
  const navigate = useNavigate();

  const fetchData = async (valorPesquisa: string) => {
    const token = localStorage.getItem('auth');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const endpoint = valorPesquisa
        ? `/pesquisar?valorPesquisa=${encodeURIComponent(valorPesquisa)}`
        : '/listartudo';
      const res = await api.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      setData(res.data);
    } catch (error) {
      alert('Erro ao carregar os dados. Verifique sua autenticação.');
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData('');
  }, [navigate]);

  const handleSearch = () => {
    fetchData(filter);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Respostas Recebidas</h2>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Digite para filtrar..."
          className="border border-gray-300 px-4 py-2 mr-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Pesquisar
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Telefone</th>
            <th className="border border-gray-300 px-4 py-2">Mensagem</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.telefone}</td>
              <td className="border border-gray-300 px-4 py-2">{item.mensagem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
