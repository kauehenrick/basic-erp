import { apiCNPJ } from "..";

export const getCNPJ = async (cnpj: string) => {
  const response = await apiCNPJ.get(cnpj);
  return response.data;
}