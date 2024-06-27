export async function fetchCarsFilters() {
  const response = await fetch(
    "https://test.taxivoshod.ru/api/test/?w=catalog-filter"
  );
  const data = await response.json();
  return data;
}
