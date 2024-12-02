import axios from "axios";
import { Clothes } from "../data/clothes";

const BASE_URL = "/api/db";

export const getClothes = async (): Promise<Clothes[]> => {
  const response = await axios.get(BASE_URL);
  return response.data as Clothes[]; // Directly use response.data
};

export const getClothesByCategory = async (
  category: string
): Promise<Clothes[]> => {
  const response = await axios.get(BASE_URL);
  const products = response.data as Clothes[];
  return products.filter((item) => item.category === category); // Filter by category
};

export const getClothesById = async (
  id: number
): Promise<Clothes | undefined> => {
  const response = await axios.get(BASE_URL);
  const products = response.data as Clothes[];
  return products.find((item) => item.id === id); // Find by ID
};
