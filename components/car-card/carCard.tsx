import { ICar } from "@/app/types/types";

interface ICarCardProps {
  car: ICar;
}

const CarCard = ({ car }: ICarCardProps) => {
  return (
    <div className="border rounded-lg shadow p-4 group">
      <div className="overflow-hidden rounded-md">
        <img
          src={car.image || "/placeholder.jpg"}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-32 object-cover rounded-md group-hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="text-xl font-semibold mt-2">
        {car.brand} {car.model}
      </h3>
      <p className="text-gray-600">{car.number}</p>
      <p className="text-gray-800 font-bold">
        {car.price ? `${car.price} руб` : "Цена не указана"}
      </p>
      <p className="text-gray-600">
        {car.tarif.join(", ") || "Тариф не указан"}
      </p>
    </div>
  );
};

export default CarCard;
