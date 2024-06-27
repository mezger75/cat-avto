"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchCarsFilters } from "@/app/helpers/fetch-cars-filters";

interface IModel {
  brand: string;
  models: string[];
}

interface ITarifs {
  [key: string]: string;
}

interface FilterContextType {
  brands: string[];
  models: IModel[];
  tarifs: ITarifs;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  selectedTarifs: string[];
  setSelectedTarifs: (tarifs: string[]) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<IModel[]>([]);
  const [tarifs, setTarifs] = useState<ITarifs>({});
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedTarifs, setSelectedTarifs] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchCarsFilters();
      setBrands(data.brands.values);
      setModels(data.models.values);
      setTarifs(data.tarif.values);
    }
    loadData();
  }, []);

  function resetFilters() {
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedTarifs([]);
  }

  return (
    <FilterContext.Provider
      value={{
        brands,
        models,
        tarifs,
        selectedBrands,
        setSelectedBrands,
        selectedModels,
        setSelectedModels,
        selectedTarifs,
        setSelectedTarifs,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter не внутри FilterProvider");
  }
  return context;
};
