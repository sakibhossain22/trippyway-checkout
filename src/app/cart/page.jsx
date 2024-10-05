"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [packData, setPackData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [coupon, setCoupon] = useState(""); // State for coupon input
  const [discountApplied, setDiscountApplied] = useState(0); // State for discount value
  const [color, setColor] = useState('bg-red-600')
  const [textColor, setTextColor] = useState('text-red-600')
  const [starColor, setStarColor] = useState('red')
  const handleRed = () => {
    setColor('bg-red-600')
    setTextColor('text-red-600')
    setStarColor('red')

  }
  const handleGreen = () => {
    setColor('bg-green-600')
    setTextColor('text-green-600')
    setStarColor('green')

  }
  const handlePurple = () => {
    setColor('bg-purple-600')
    setTextColor('text-purple-600')
    setStarColor('purple')


  }
  const handleYellow = () => {
    setColor('bg-yellow-600')
    setTextColor('text-yellow-600')
    setStarColor('yellow')


  }
  // Fetching package data
  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();
        setPackData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  // Handle coupon input change
  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  // Handle coupon submission
  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscountApplied(10); // Applying 10% discount
    } else {
      setDiscountApplied(0); // Reset if coupon is incorrect
    }
  };

  // Calculate total price and apply discount
  const calculateTotalPrice = () => {
    const total = packData.reduce((acc, pkg) => acc + pkg.basePrice, 0);
    const discountedTotal = total - (total * discountApplied) / 100;
    return discountedTotal.toFixed(2); // Return the total price with the discount applied
  };

  // Function to handle Preview button click
  const handlePreviewClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  // Function to go back to the cart list
  const handleBackToCart = () => {
    setSelectedPackage(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white">
      <p className={` ${color} text-white text-center py-2 font-bold`}>
        Get 25% off with code: DISCOUNT25
      </p>
      {/* Color */}
      <div className="flex items-center flex-col">
        <h1 className="text-black font-bold text-2xl">Color Button</h1>
        <div className="flex items-center gap-10 my-2">
          <button onClick={handleRed}>
            <div className="bg-red-600 h-6 w-6 rounded-full"></div>
          </button>
          <button onClick={handleGreen}>
            <div className="bg-green-600 h-6 w-6 rounded-full"></div>
          </button>
          <button onClick={handleYellow}>
            <div className="bg-yellow-600 h-6 w-6 rounded-full"></div>
          </button >
          <button onClick={handlePurple}>
            <div className="bg-purple-600 h-6 w-6 rounded-full"></div>
          </button>
        </div>
      </div>

      <div className="container bg-white h-screen mx-auto px-4 lg:flex">
        {selectedPackage ? (
          <div className="w-full lg:w-2/3 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Package Details</h2>
            <div className="flex items-center mb-4">
              <Image
                src={selectedPackage.image}
                alt={selectedPackage.name}
                width={200}
                height={200}
                className="h-48 w-48 mr-4"
              />
              <div>
                <p className="font-bold text-xl">{selectedPackage.name}</p>
                <p className="text-gray-600">{selectedPackage.description}</p>
                <p className="text-lg font-semibold">
                  Price: ${selectedPackage.basePrice.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={handleBackToCart}
              className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Back to Cart
            </button>
          </div>
        ) : (
          <div className="w-full lg:w-2/3 overflow-y-auto mt-8 pr-4">
            <table className="w-full text-black border-collapse">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="p-2 text-left">Package</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {packData.map((pkg) => (
                  <tr key={pkg._id}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          width={50}
                          height={50}
                          className="h-12 w-12 mr-2"
                        />
                        <div>
                          <p className="font-medium">{pkg.name}</p>
                          <p className="text-sm text-gray-600">{pkg.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-right">${pkg.basePrice.toFixed(2)}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handlePreviewClick(pkg)}
                        className={`${color} hover:bg-blue-700 text-white font-bold py-1 px-3 rounded`}
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 w-full lg:w-1/3 text-black lg:sticky lg:top-0">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>ORDER SUMMARY</h1>
            <div className="flex justify-between items-center">
              <p className="text-lg">Subtotal:</p>
              <p className="text-lg">${calculateTotalPrice()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Shipping:</p>
              <p className="text-lg">$0.00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg">Tax:</p>
              <p className="text-lg">$0.00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-lg font-bold">${calculateTotalPrice()}</p>
            </div>

            {/* Coupon Input */}
            <div className="mt-4 flex gap-2 items-center justify-center">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={handleCouponChange}
                className="border px-4 py-2 w-4/6 mb-2"
              />
              <button
                onClick={applyCoupon}
                className={`${color} hover:bg-orange-700 text-white font-bold relative py-2 bottom-1 flex-1 rounded w-full`}
              >
                Apply Coupon
              </button>
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <button className={`${color} hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full`}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
