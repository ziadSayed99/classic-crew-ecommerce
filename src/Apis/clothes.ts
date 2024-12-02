import axios from "axios";
import { Clothes } from "../data/clothes";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "/api" // For local development, it will be proxied to localhost:3000/api
    : "https://your-deployed-site.vercel.app/api"; // Use your Vercel API URL in production

export const getClothes = async (): Promise<Clothes[]> => {
  const response = await axios.get(baseUrl);
  return response.data as Clothes[]; // Directly use response.data
};

export const getClothesByCategory = async (
  category: string
): Promise<Clothes[]> => {
  const response = await axios.get(baseUrl);
  const products = response.data as Clothes[];
  return products.filter((item) => item.category === category); // Filter by category
};

export const getClothesById = async (
  id: number
): Promise<Clothes | undefined> => {
  const response = await axios.get(baseUrl);
  const products = response.data as Clothes[];
  return products.find((item) => item.id === id); // Find by ID
};
