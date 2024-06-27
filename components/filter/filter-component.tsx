"use client";

import { useMemo } from "react";
import { useFilter } from "./filter-provider";
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from "@/components/ui/multiselect";

interface FilterComponentProps {
  type: "brand" | "model" | "tarif";
}

export const FilterComponent = ({ type }: FilterComponentProps) => {
  const {
    brands,
    models,
    tarifs,
    selectedBrands,
    setSelectedBrands,
    selectedModels,
    setSelectedModels,
    selectedTarifs,
    setSelectedTarifs,
  } = useFilter();

  const handleChange = (values: string[]) => {
    if (type === "brand") {
      setSelectedBrands(values);
      setSelectedModels([]);
    } else if (type === "model") {
      setSelectedModels(values);
    } else {
      setSelectedTarifs(values);
    }
  };

  const options = useMemo(() => {
    if (type === "brand") {
      return brands;
    } else if (type === "model") {
      return models
        .filter((model) => selectedBrands.includes(model.brand))
        .flatMap((model) => model.models);
    } else {
      return Object.values(tarifs);
    }
  }, [type, brands, models, tarifs, selectedBrands]);

  const selectedValues = useMemo(() => {
    if (type === "brand") {
      return selectedBrands;
    } else if (type === "model") {
      return selectedModels;
    } else {
      return selectedTarifs.map((key) => tarifs[key]);
    }
  }, [type, selectedBrands, selectedModels, selectedTarifs, tarifs]);

  return (
    <MultiSelector
      values={selectedValues}
      onValuesChange={(values) => {
        if (type === "tarif") {
          const selectedKeys = values.map((value) =>
            Object.keys(tarifs).find((key) => tarifs[key] === value)
          );
          handleChange(selectedKeys as string[]);
        } else {
          handleChange(values);
        }
      }}
      className="w-52"
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput
          placeholder={`Выберите ${
            type === "brand" ? "марку" : type === "model" ? "модель" : "тариф"
          }...`}
        />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.length > 0 &&
            options.map((option) => (
              <MultiSelectorItem key={option} value={option}>
                {option}
              </MultiSelectorItem>
            ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};
