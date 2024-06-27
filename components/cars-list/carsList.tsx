"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchCarsList } from "@/app/helpers/fetch-cars-list";
import { useFilter } from "@/components/filter/filter-provider";
import CarCard from "@/components/car-card/carCard";
import { ICar } from "@/app/types/types";
import { debounce } from "@/app/helpers/debounce";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CarsList = () => {
  const [carsList, setCarsList] = useState<ICar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const {
    selectedBrands,
    selectedModels,
    selectedTarifs,
    setSelectedBrands,
    setSelectedModels,
    setSelectedTarifs,
  } = useFilter();
  const router = useRouter();

  const debouncedFetchCarsList = useCallback(
    debounce(async (filters: Record<string, string[]>, page: number) => {
      setLoading(true);
      setError(null);
      try {
        const carsData = await fetchCarsList(filters, page);
        setCarsList(carsData.list);
        // setPage(1); // сброс страницы при выборе новых фильтров
      } catch (error) {
        setError("Что-то пошло не так. Попробуйте еще раз позже.");
      } finally {
        setLoading(false);
      }
    }, 1500),
    []
  );

  useEffect(() => {
    const savedState = sessionStorage.getItem("carListState");
    if (savedState) {
      const { carsList, page, selectedBrands, selectedModels, selectedTarifs } =
        JSON.parse(savedState);
      setCarsList(carsList);
      setPage(page);
      setSelectedBrands(selectedBrands);
      setSelectedModels(selectedModels);
      setSelectedTarifs(selectedTarifs);
      sessionStorage.removeItem("carListState");
    } else {
      const fetchInitialCarsList = async () => {
        setLoading(true);
        setError(null);
        const filters = {
          brand: selectedBrands,
          model: selectedModels,
          tarif: selectedTarifs,
        };
        try {
          const carsData = await fetchCarsList(filters, page);
          setCarsList(carsData.list);
          setMaxPage(carsData.pages);
        } catch (error) {
          setError("Что-то пошло не так. Попробуйте еще раз позже.");
        } finally {
          setLoading(false);
        }
      };
      fetchInitialCarsList();
    }
  }, [page]);

  useEffect(() => {
    const filters = {
      brand: selectedBrands,
      model: selectedModels,
      tarif: selectedTarifs,
    };
    if (carsList.length > 0) debouncedFetchCarsList(filters, page);
  }, [selectedBrands, selectedModels, selectedTarifs, debouncedFetchCarsList]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) {
    return (
      <div className="flex h-screen w-[80%] justify-center items-center">
        {<Loader2 className="mx-1 h-8 w-8 animate-spin" />}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCarClick = (id: number) => {
    // Храним состояние в сешнстор
    sessionStorage.setItem(
      "carListState",
      JSON.stringify({
        carsList,
        page,
        selectedBrands,
        selectedModels,
        selectedTarifs,
      })
    );
    router.push(`/car/${id}`);
  };

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {carsList.length > 0 ? (
          carsList.map((car) => (
            <li
              onClick={() => handleCarClick(car.id)}
              key={car.id}
              className="cursor-pointer"
            >
              <CarCard car={car} />
            </li>
          ))
        ) : (
          <p>По вашему запросу ничего не найдено. Попробуйте еще раз.</p>
        )}
      </ul>
      <div className="flex justify-between mt-4 items-center">
        <Button onClick={handlePreviousPage} disabled={page === 1}>
          Предыдущая
        </Button>
        <span>Страница {page}</span>
        <Button
          onClick={handleNextPage}
          disabled={carsList.length === 0 || page === maxPage}
        >
          Следующая
        </Button>
      </div>
    </div>
  );
};

export default CarsList;
