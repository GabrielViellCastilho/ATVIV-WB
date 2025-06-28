import React, { useEffect, useState } from "react";
import { Cliente } from "../types";

interface ModalEditarClienteProps {
  cliente: Cliente;
  onSalvar: (clienteAtualizado: Cliente) => void;
  onFechar: () => void;
}

const ModalEditarCliente: React.FC<ModalEditarClienteProps> = ({
  cliente,
  onSalvar,
  onFechar,
}) => {
  const [form, setForm] = useState<Cliente>({ ...cliente });

  useEffect(() => {
    setForm({ ...cliente });
  }, [cliente]);

  const atualizarCampo = (
    campo: keyof Cliente,
    valor: string | null
  ) => {
    setForm((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const atualizarEnderecoCampo = (
    campo: keyof NonNullable<Cliente["endereco"]>,
    valor: string
  ) => {
    setForm((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [campo]: valor,
      },
    }));
  };

  const atualizarTelefone = (index: number, campo: "ddd" | "numero", valor: string) => {
    const telefonesAtualizados = [...(form.telefones || [])];
    telefonesAtualizados[index] = {
      ...telefonesAtualizados[index],
      [campo]: valor,
    };
    setForm((prev) => ({
      ...prev,
      telefones: telefonesAtualizados,
    }));
  };

  const adicionarTelefone = () => {
    setForm((prev) => ({
      ...prev,
      telefones: [...(prev.telefones || []), { ddd: "", numero: "" }],
    }));
  };

  const removerTelefone = (index: number) => {
    const telefonesAtualizados = form.telefones?.filter((_, i) => i !== index) || [];
    setForm((prev) => ({
      ...prev,
      telefones: telefonesAtualizados,
    }));
  };

  const handleSubmit = () => {
    onSalvar(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl space-y-4 overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold">Editar Cliente</h2>

        <div>
          <label className="block text-sm font-medium">ID</label>
          <input
            type="text"
            value={form.id}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={form.nome ?? ""}
            onChange={(e) => atualizarCampo("nome", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Sobrenome</label>
          <input
            type="text"
            value={form.sobreNome ?? ""}
            onChange={(e) => atualizarCampo("sobreNome", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email ?? ""}
            onChange={(e) => atualizarCampo("email", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <h3 className="text-lg font-semibold mt-4">Endereço</h3>

        {["estado", "cidade", "bairro", "rua", "numero", "codigoPostal", "informacoesAdicionais"].map((campo) => (
          <div key={campo}>
            <label className="block text-sm font-medium capitalize">{campo}</label>
            <input
              type="text"
              value={(form.endereco?.[campo as keyof typeof form.endereco] as string) ?? ""}
              onChange={(e) =>
                atualizarEnderecoCampo(campo as keyof typeof form.endereco, e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <h3 className="text-lg font-semibold mt-4">Telefones</h3>

        {form.telefones?.map((telefone, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder="DDD"
              value={telefone.ddd}
              onChange={(e) => atualizarTelefone(index, "ddd", e.target.value)}
              className="w-16 border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Número"
              value={telefone.numero}
              onChange={(e) => atualizarTelefone(index, "numero", e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={() => removerTelefone(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Remover
            </button>
          </div>
        ))}

        <button
          onClick={adicionarTelefone}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Adicionar Telefone
        </button>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onFechar}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarCliente;
