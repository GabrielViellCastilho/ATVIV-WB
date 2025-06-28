export type Cliente = {
  id: number;
  nome: string;
  sobreNome: string | null;
  email: string | null;
  endereco?: {
    rua?: string;
    numero?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    codigoPostal?: string;
    informacoesAdicionais?: string;
  } | null;
  telefones: {
    id ?: number;
    ddd: string;
    numero: string;
  }[];
  links: {
    rel: string;
    href: string;
  }[];
};
