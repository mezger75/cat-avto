"use client";

import { FilterComponent } from "@/components/filter/filter-component";
import { useFilter } from "@/components/filter/filter-provider";
import { Button } from "@/components/ui/button";

const FilterControls = () => {
  const { resetFilters } = useFilter();

  return (
    <Button className="ml-4" onClick={resetFilters}>
      Сбросить фильтры
    </Button>
  );
};

export default function Sidebar() {
  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Марка
          </h2>
          <FilterComponent type="brand" />
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Модель
          </h2>
          <FilterComponent type="model" />
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Тариф
          </h2>
          <FilterComponent type="tarif" />
        </div>
      </div>
      <FilterControls />
    </div>
  );
}
