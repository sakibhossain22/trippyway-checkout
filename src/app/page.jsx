"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const getRandomColor = () => {
  const colors = ['bg-red-200', 'bg-yellow-200', 'bg-blue-200', 'bg-green-200', 'bg-purple-200', 'bg-pink-200', 'bg-orange-200'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
        setPackages(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);



  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-8">
      <div className='mb-4'>
        <h2 className="text-3xl font-bold text-center text-white mb-2">Available Packages</h2>
        <div className='bg-white h-1 w-32 mx-auto'></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg._id} className={`flex flex-col rounded-2xl p-4 shadow-lg overflow-hidden ${getRandomColor()}`}>
            <div className='flex-1'>
              <h3 className="text-xl mb-3 text-center text-black font-semibold">{pkg.name}</h3>
              <p className="text-gray-700 text-center mb-2 text-sm">{pkg.description}</p>
            </div>
            <Image className='w-full rounded-lg h-60' width={300} height={300} src={pkg?.image} alt={pkg?.name} />
            <div className="p-4 flex items-center justify-between">
              <p className="text-lg text-gray-950 font-black">${pkg.basePrice}</p>
              <p className="font-bold text-black">Duration: {pkg.duration}</p>
            </div>
            <div className="p-4">
              <Link href={`/package/${pkg?.id}`}>
                <button className="w-full bg-yellow-500 hover:text-white text-black font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
