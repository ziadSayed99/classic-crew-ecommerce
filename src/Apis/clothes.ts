import axios from "axios";
import { Clothes } from "../data/clothes";

export const getClothes = async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data as Clothes[];
};

export const getClothesByCategory = async (category: string) => {
  const response = await axios.get(
    `http://localhost:3000/products?category=${category}`
  );
  return response.data as Clothes[];
};

export const getClothesById = async (id: number) => {
  const response = await axios.get(`http://localhost:3000/products/${id}`);
  return response.data as Clothes[];
};
