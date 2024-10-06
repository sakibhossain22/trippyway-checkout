"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import usePackage from "../../../lib/usePackage";

const Page = () => {
  const [packData, setPackData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [coupon, setCoupon] = useState(""); 
  const [discountApplied, setDiscountApplied] = useState(0); 
  const [members, setMembers] = useState([]);
  const [prePack, setPrePack] = useState([]);
  const [color, setColor] = useState("bg-red-600");
  const [textColor, setTextColor] = useState("text-red-600");
  const { data, refetch } = usePackage(selectedPackage)
  const [memDis, setMemDis] = useState(0)
  console.log(members);
  const handleRed = () => {
    setColor('bg-red-600')
    setTextColor('text-red-600')

  }
  const handleGreen = () => {
    setColor('bg-green-600')
    setTextColor('text-green-600')

  }
  const handlePurple = () => {
    setColor('bg-purple-600')
    setTextColor('text-purple-600')


  }
  const handleYellow = () => {
    setColor('bg-yellow-600')
    setTextColor('text-yellow-600')


  }
  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch packages");
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
  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscountApplied(10); // Applying 10% discount
      Swal.fire({
        icon: "success",
        title: "10% Discount Coupon Applied",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      setDiscountApplied(0);
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const calculateTotalPrice = () => {
    const totalBasePrice = packData.reduce(
        (acc, pkg) => acc + (pkg.basePrice || 0), 
        0
    );

    // Calculate total member contribution
    const totalMemberContribution = data?.memberData?.reduce(
        (acc, member) => acc + (member.isAdult ? 100 : 50), 
        0
    ) || 0; 

    const total = totalBasePrice - totalMemberContribution;

    const discountedTotal = total - (total * (discountApplied || 0)) / 100 + 5;

    const finalTotalPrice = discountedTotal < 0 ? "0.00" : discountedTotal.toFixed(2);

    return [finalTotalPrice, totalMemberContribution];
};
const [totalPrice, totalMemberContribution] = calculateTotalPrice();
console.log("Total Price:", totalPrice);
console.log("Total Member Contribution:", totalMemberContribution);




  const handlePreviewClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleBackToCart = () => {
    setSelectedPackage(null);
    setMembers([]); 
  };

  const handleAddMember = () => {
    setMembers([...members, { name: "", age: "", isAdult: true }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = members.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setMembers(updatedMembers);
  };
  const handleMemberSubmit = async (e) => {
    e.preventDefault();

    const memberData = {
      members: members, 
    };

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberData: memberData, selectedPackage: selectedPackage?.id }),
      });

      if (!response.ok) throw new Error("Failed to submit members");

      const result = await response.json();
      setMembers([]); 
      refetch()
      if (result) {
        await Swal.fire({
          icon: "success",
          title: "Member Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }



    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white">
      <p className={` ${color} text-white text-center py-2 font-bold`}>
        Get 25% off with code: DISCOUNT10
      </p>
      <div className="flex items-center flex-col">
        <h1 className="text-black font-bold text-xl">Color Button</h1>
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
          <div className="w-full lg:w-2/3 mx-auto mt-8">
            <h2 className={`${textColor} text-2xl font-bold mb-4`}>Package Details</h2>
            <div className="flex items-center mb-4">
              <Image
                src={selectedPackage.image}
                alt={selectedPackage.name}
                width={200}
                height={200}
                className="h-32 w-48 mr-4"
              />
              <div>
                <p className={`${textColor} font-bold text-xl`}>{selectedPackage.name}</p>
                <p className="text-gray-600">{selectedPackage.description}</p>
                <p className="text-lg font-semibold text-black">
                  Price: ${selectedPackage.basePrice.toFixed(2)}
                </p>
                <p className="text-lg text-black">Duration: {selectedPackage.duration}</p>
              </div>
            </div>
            {/* Member Show Section */}
            <div>
              <div className="text-black font-bold">
                <h1>Members</h1>
                <div className="flex items-center gap-4 border-b">
                  <h1>SL</h1>
                  <h1>Name</h1>
                  <h1>Age</h1>
                  <h1>Adult / Child</h1>
                </div>
                {
                  data?.memberData && <div>
                    <tbody>
                      {
                        data?.memberData?.map((member, idx) => {
                          return <div className="flex items-center gap-8" key={idx}>
                            <td>{idx + 1}</td>
                            <td>{member?.name}</td>
                            <td>{member?.age}</td>
                            <td>{member?.isAdult ? 'Adult' : 'Child'}</td>
                          </div>
                        })
                      }
                    </tbody>
                  </div>
                }
              </div>
            </div>
            {/* Members add Section */}
            <div className="mb-4 border-t">
              <h3 className="text-xl text-black font-bold mb-2">Add Members</h3>
              {members.map((member, index) => (
                <div key={index} className="flex text-black gap-4 mb-2">
                  <form onSubmit={handleMemberSubmit}>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                      className="border px-2 py-1"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      required
                      value={member.age}
                      onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                      className="border px-2 py-1"
                    />
                    <select
                      value={member.isAdult}
                      onChange={(e) =>
                        handleMemberChange(index, "isAdult", e.target.value === "true")
                      }
                      className="border px-2 py-1"
                    >
                      <option value="true">Adult</option>
                      <option value="false">Child</option>
                    </select>
                    <input className={`${color} text-white px-8 py-1 mx-2 cursor-pointer hover:bg-blue-950 rounded`} type="submit" value="Add" />
                  </form>
                </div>
              ))}
              <button
                onClick={handleAddMember}
                className={`${color} hover:bg-blue-800 text-white px-4 py-2 rounded`}
              >
                Add Member
              </button>
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
                          <p className="text-sm hidden lg:block text-gray-600">
                            {pkg.description}
                          </p>
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

        {/* Order Summary Section */}
        <div className="mt-8 w-full lg:w-1/3 text-black lg:sticky lg:top-0">
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h1 className={`text-3xl font-bold mb-4 ${textColor}`}>ORDER SUMMARY</h1>
            <div className="flex flex-col justify-between gap-3">
              <div className="mt-4 flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={handleCouponChange}
                  className="border px-2 py-2 w-full"
                />
                <button
                  onClick={applyCoupon}
                  className={`hover:bg-green-800 relative bottom-1 text-white mt-2 px-4 py-2 rounded w-full ${color}`}
                >
                  Apply Coupon
                </button>

              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Subtotal:</p>
                <p className="text-lg">${totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Tax:</p>
                <p className="text-lg">$5.00</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Discount:</p>
                <p className="text-lg">{discountApplied}%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg">Member Discount:</p>
                <p className="text-lg">${totalMemberContribution}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Total:</p>
                <p className="text-lg font-bold">${totalPrice}</p>
              </div>

              {/* Coupon Input */}

              <button
                className={`hover:bg-green-800 text-white mt-2 px-4 py-2 rounded w-full ${color}`}
              >
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