import axios from 'axios';

export const apiCNPJ = axios.create({
  baseURL: "https://brasilapi.com.br/api/cnpj/v1/",
});

export const apiCEP = axios.create({
  baseURL: "https://brasilapi.com.br/api/cep/v2/",
});