import axios from "axios";
import { CadastroData } from "./pages/PaginaCadastro";
import { Cliente } from "./types";


export const enviarCadastro = async (dados: CadastroData) => {
  const response = await axios.post("http://localhost:32832/cliente/cadastrar", dados);
  return response.data;
};

export const atualizarCadastro = async (dados: Cliente) => {
  const response = await axios.put("http://localhost:32832/cliente/atualizar", dados);
  return response.status;
};

export const excluirCadastro = async (id: number) => {
  const response = await axios.delete("http://localhost:32832/cliente/excluir", {
    data: {id}
  });
  return response.status;
};



export const consultarCadastros = async () => {
  try {
    const response = await axios.get("http://localhost:32832/clientes", {
      // Permite tratar o status manualmente
      validateStatus: (status) => status === 200 || status === 302,
      // Axios por padrão segue redirecionamento, mas podemos reforçar:
      maxRedirects: 5,
    });

    if (response.status === 302) {
      const redirectUrl = response.headers.location;
      
      if (redirectUrl) {
        // Redireciona manualmente se houver Location
        const redirected = await axios.get(redirectUrl);
        return redirected.data;
      } else {
        // Caso a resposta 302 tenha o corpo já com os dados (raro, mas possível)
        return response.data;
      }
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao consultar cadastros:", error);
    throw error;
  }
};
