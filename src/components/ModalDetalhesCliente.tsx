import React from "react";
import { Cliente } from "../types";


type Props = {
  cliente: Cliente;
  onClose: () => void;
};

const ModalDetalhesCliente: React.FC<Props> = ({ cliente, onClose }) => {
  return (
    <div className="mt-6 p-4 border rounded shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Detalhes do Cliente</h2>
      <p><strong>ID:</strong> {cliente.id}</p>
      <p><strong>Nome:</strong> {cliente.nome} {cliente.sobreNome}</p>
      <p><strong>Email:</strong> {cliente.email || "N/A"}</p>
      <p><strong>Telefone:</strong> {cliente.telefones.map(t => `(${t.ddd}) ${t.numero}`).join(", ") || "N/A"}</p>
      <p><strong>Endereço:</strong></p>
      <ul className="ml-4 list-disc">
        <li><strong>Rua:</strong> {cliente.endereco?.rua}</li>
        <li><strong>Número:</strong> {cliente.endereco?.numero}</li>
        <li><strong>Bairro:</strong> {cliente.endereco?.bairro}</li>
        <li><strong>Cidade:</strong> {cliente.endereco?.cidade}</li>
        <li><strong>Estado:</strong> {cliente.endereco?.estado}</li>
        <li><strong>CEP:</strong> {cliente.endereco?.codigoPostal}</li>
        {cliente.endereco?.informacoesAdicionais && (
          <li><strong>Info Adicional:</strong> {cliente.endereco.informacoesAdicionais}</li>
        )}
      </ul>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
      >
        Fechar
      </button>
    </div>
  );
};

export default ModalDetalhesCliente;
