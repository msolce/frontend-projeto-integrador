// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      if (response.data.msg === 'logado') {
        if (response.data.token) {
          localStorage.setItem('auth', `Bearer ${response.data.token}`);
          login(); // Atualiza o estado global de autenticação
        }
        navigate('/admin');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro ao realizar login. Tente novamente.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Login Admin</h2>
      <form onSubmit={handleLogin} className="space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Entrar
        </button>
      </form>
    </div>
  );
}
