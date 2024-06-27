import CarsList from "@/components/cars-list/carsList";
import Sidebar from "@/components/sidebar/sidebar";

export default function HomePage() {
  return (
    <main className="flex min-h-screen p-6">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/5 md:fixed top-0 left-0 h-screen relative">
          <Sidebar />
        </div>
        <div className="w-full lg:w-4/5 md:ml-[20%]">
          <CarsList />
        </div>
      </div>
    </main>
  );
}
