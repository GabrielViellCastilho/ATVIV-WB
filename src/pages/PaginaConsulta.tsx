import React, { useEffect, useState } from "react";
import { atualizarCadastro, consultarCadastros, excluirCadastro } from "../api";
import ModalDetalhesCliente from "../components/ModalDetalhesCliente";
import ModalEditarCliente from "../components/ModalEditarCliente";
import { Cliente } from "../types";



const ConsultaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);

  const fetchClientes = async () => {
    try {
      const data = await consultarCadastros();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleAtualizar = (id: number) => {
    const cliente = clientes.find((c) => c.id === id);
    if (cliente) {
      setClienteEmEdicao(cliente);
    }
  };


  const handleExcluir = async (id: number) => {
    try{
      await excluirCadastro(id)
      await fetchClientes()
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  const handleVerDetalhes = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
  };

  const handleFecharDetalhes = () => {
    setClienteSelecionado(null);
  };

  const handleSalvarEdicao = async (clienteAtualizado: Cliente) => {
    try {
      await atualizarCadastro(clienteAtualizado);
      await fetchClientes();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    } finally {
      setClienteEmEdicao(null);
    }
  };


  const handleFecharEdicao = () => {
    setClienteEmEdicao(null);
  };



  if (loading) return <p className="p-4">Carregando clientes...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Lista de Clientes</h1>

      {/* Tabela */}
      <div className="overflow-auto rounded shadow-md">
        <table className="min-w-full text-sm text-left text-gray-800 border border-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Telefone</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{cliente.id}</td>
                <td className="px-4 py-2">
                  {cliente.nome} {cliente.sobreNome ?? ""}
                </td>
                <td className="px-4 py-2">{cliente.email || "N/A"}</td>
                <td className="px-4 py-2">
                  {cliente.telefones.length > 0
                    ? `(${cliente.telefones[0].ddd}) ${cliente.telefones[0].numero}`
                    : "N/A"}
                </td>
                <td className="px-4 py-2">
                  {cliente.endereco?.cidade || "N/A"}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleAtualizar(cliente.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Atualizar
                  </button>
                  <button
                    onClick={() => handleExcluir(cliente.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => handleVerDetalhes(cliente)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de detalhes */}

      {clienteSelecionado && (
        <ModalDetalhesCliente
          cliente={clienteSelecionado}
          onClose={handleFecharDetalhes}
        />
      )}

      {clienteEmEdicao && (
        <ModalEditarCliente
          cliente={clienteEmEdicao}
          onSalvar={handleSalvarEdicao}
          onFechar={handleFecharEdicao}
        />
      )}


    </div>
  );
};

export default ConsultaClientes;
