"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchCarDetails } from "@/app/helpers/fetch-cars-list";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ICarDetails } from "@/app/types/types";
import { Loader2 } from "lucide-react";

const CarPage = () => {
  const [car, setCar] = useState<ICarDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    const fetchCar = async () => {
      setLoading(true);
      setError(null);
      try {
        const carData = await fetchCarDetails(id as string);
        setCar(carData);
      } catch (error) {
        setError("Что-то пошло не так. Попробуйте еще раз позже.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleBackClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        {<Loader2 className="mx-1 h-8 w-8 animate-spin" />}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!car) {
    return <div>Автомобиль не найден</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <Button onClick={handleBackClick} className="self-start">
        Назад
      </Button>
      <h1 className="text-3xl font-bold">{`${car.brand} ${car.model}`}</h1>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {car.images ? (
            car.images.map((image) => (
              <CarouselItem key={image.id}>
                <img
                  src={image?.image || "/placeholder.jpg"}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-auto"
                />
              </CarouselItem>
            ))
          ) : (
            <img src="/placeholder.jpg" alt={`${car.brand} ${car.model}`} />
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p>Тариф: {car.tarif.join(", ")}</p>
      {car.price === 0 ? (
        <p>Цена не указана.</p>
      ) : (
        <p>Цена: {car.price} руб.</p>
      )}
    </main>
  );
};

export default CarPage;
