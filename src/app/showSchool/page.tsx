"use client";
import { useEffect, useState } from "react";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string; // This will be either a filename or full URL
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/getSchools"); // ✅ absolute path in App Router
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data: School[] = await res.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading schools...</p>;
  }

  return (
    <div>
       
       
    
    <div className="p-6">
      
      <h1 className="text-3xl font-bold mb-6 text-center flex justify-center">Schools </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* ✅ handle both external URLs and local images */}
            <img
              src={
                school.image.startsWith("http")
                  ? school.image
                  : `/schoolImages/${school.image}`
              }
              alt={school.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{school.name}</h2>
              <p className="text-gray-700">{school.address}</p>
              <p className="text-gray-600 text-sm">{school.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
