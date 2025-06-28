import { useState } from "react";
import { enviarCadastro } from "../api";

interface Telefone {
    ddd: string;
    numero: string;
}

export interface CadastroData {
    nome: string;
    sobrenome: string;
    email: string;
    telefones: Telefone[];
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    informacoesAdicionais: string;
}

export default function PaginaCadastro() {
    const [formData, setFormData] = useState<CadastroData>({
        nome: "",
        sobrenome: "",
        email: "",
        telefones: [{ ddd: "", numero: "" }],
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        informacoesAdicionais: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
        campoTelefone?: keyof Telefone
    ) => {
        const { id, value } = e.target;

        if (typeof index === "number" && campoTelefone) {
            const novosTelefones = [...formData.telefones];
            novosTelefones[index][campoTelefone] = value;
            setFormData({ ...formData, telefones: novosTelefones });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const adicionarTelefone = () => {
        setFormData({
            ...formData,
            telefones: [...formData.telefones, { ddd: "", numero: "" }],
        });
    };

    const removerTelefone = (index: number) => {
        const novosTelefones = formData.telefones.filter((_, i) => i !== index);
        setFormData({ ...formData, telefones: novosTelefones });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await enviarCadastro(formData);
            alert("Cadastro enviado com sucesso!");
        } catch (error) {
            alert("Erro ao enviar cadastro.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-xl shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10"
            >
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center md:text-left">
                        Dados Pessoais
                    </h2>

                    {["nome", "sobrenome", "email"].map((field) => (
                        <div className="mb-6" key={field}>
                            <label
                                htmlFor={field}
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="text"
                                id={field}
                                value={(formData as any)[field]}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder={`Digite seu ${field}`}
                                required
                            />
                        </div>
                    ))}

                    <div className="mb-8">
                        <h3 className="text-xl font-medium mb-4 text-gray-700">Telefones</h3>
                        {formData.telefones.map((telefone, index) => (
                            <div
                                key={index}
                                className="mb-4 flex gap-4 items-end border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
                            >
                                <div className="flex gap-2 min-w-0">
                                    <div className="flex-1 min-w-0">
                                        <label className="text-sm text-gray-600">DDD</label>
                                        <input
                                            type="text"
                                            value={telefone.ddd}
                                            onChange={(e) => handleChange(e, index, "ddd")}
                                            className="w-full border border-gray-300 rounded-md p-2 min-w-0"
                                            maxLength={3} 
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <label className="text-sm text-gray-600">Número</label>
                                        <input
                                            type="text"
                                            value={telefone.numero}
                                            onChange={(e) => handleChange(e, index, "numero")}
                                            className="w-full border border-gray-300 rounded-md p-2 min-w-0 max-w-full"
                                            maxLength={15}
                                        />
                                    </div>
                                </div>

                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removerTelefone(index)}
                                        className="text-red-600 hover:text-red-800 font-semibold transition p-4"
                                        title="Remover telefone"
                                    >
                                        &times;
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={adicionarTelefone}
                            className="mt-2 text-blue-600 hover:text-blue-800 font-semibold transition"
                        >
                            + Adicionar telefone
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center md:text-left">
                        Endereço
                    </h2>

                    {[
                        "rua",
                        "numero",
                        "bairro",
                        "cidade",
                        "estado",
                        "cep",
                    ].map((field) => (
                        <div className="mb-6" key={field}>
                            <label
                                htmlFor={field}
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type="text"
                                id={field}
                                value={(formData as any)[field]}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder={`Digite seu(a) ${field}`}
                                required
                            />
                        </div>
                    ))}

                    <div className="mb-6">
                        <label
                            htmlFor="informacoesAdicionais"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Informações Adicionais
                        </label>
                        <textarea
                            id="informacoesAdicionais"
                            value={formData.informacoesAdicionais}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Informações extras, referências, etc."
                            className="w-full rounded-md border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
