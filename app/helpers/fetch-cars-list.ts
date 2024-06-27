import { ICarDetails } from "../types/types";

async function fetchCarsList(filters: Record<string, string[]>, page: number) {
  const url = new URL("https://test.taxivoshod.ru/api/test/");
  url.searchParams.append("w", "catalog-cars");

  // Добавляем параметры фильтра
  Object.entries(filters).forEach(([key, values]) => {
    values.forEach((value) => {
      url.searchParams.append(`${key}[]`, value);
    });
  });

  // Добавляем страницу
  url.searchParams.append("page", page.toString());

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP ошибка! статус: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export { fetchCarsList };

// Запрос данных по id
const fetchCarDetails = async (id: string): Promise<ICarDetails> => {
  try {
    const response = await fetch(
      `https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`
    );

    if (!response.ok) {
      throw new Error("Что-то пошло не так");
    }

    const data = await response.json();
    if (data.result !== 1) {
      throw new Error("Что-то пошло не так");
    }

    const carDetails: ICarDetails = {
      id: data.item.id,
      brand: data.item.brand,
      model: data.item.model,
      price: data.item.price,
      images: data.item.images,
      tarif: data.item.tarif,
    };

    return carDetails;
  } catch (error) {
    console.error("Что-то пошло не так:", error);
    throw new Error("Что-то пошло не так. Попробуйте еще раз позже.");
  }
};

export { fetchCarDetails };
