import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (recipe: any, authHeaders = {}) => {
  const response = await axios.post(API_URL, recipe, authHeaders);
  return response.data;
};

export const updateProduct = async (id: string, recipe: any, authHeaders = {}) => {
  const response = await axios.put(`${API_URL}/${id}`, recipe, authHeaders);
  return response.data;
};

export const deleteProduct = async (id: string, authHeaders = {}) => {
  await axios.delete(`${API_URL}/${id}`, authHeaders);
};
