import { apiCEP } from "..";

export const getCEP = async (cep: string) => {
  const response = await apiCEP.get(cep);
  return response.data;
}