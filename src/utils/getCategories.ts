export const fetchCategories = async () => {
  try {
    const response = await fetch("api/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
