import { $authHost, $host } from "./index";
export const createMark = async (mark) => {
  const { data } = await $authHost.post("api/mark", mark);
  return data;
};

export const fetchMarks = async () => {
  const { data } = await $host.get("api/mark");
  return data;
};

export const createCategory = async (category) => {
  const { data } = await $authHost.post("api/category", category);
  return data;
};

export const fetchCategoties = async () => {
  const { data } = await $host.get("api/category");
  return data;
};

export const createProduct = async (product) => {
  const { data } = await $authHost.post("api/product", product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await $authHost.delete(`api/product/${id}`);
  return data;
};

export const fetchProducts = async (categoryId) => {
  const { data } = await $host.get("api/product", {
    params: {
      categoryId,
    },
  });
  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("api/product/" + id);
  return data;
};
