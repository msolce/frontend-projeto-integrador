// src/pages/FormPage.tsx
import React, { useState } from 'react';
import { api } from '../services/api';

export default function FormPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/responder', formData);
      alert('Dados enviados!');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        mensagem: '',
      });
    } catch (error) {
      alert('Erro ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Formulário</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="mensagem"
          placeholder="Mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Enviar
        </button>
      </form>
    </div>
  );
}
