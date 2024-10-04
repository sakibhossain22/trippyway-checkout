"use client"
// pages/checkout.js

import { useState } from 'react';

export default function Checkout() {
  const [members, setMembers] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [validCoupon, setValidCoupon] = useState(false);
  const basePrice = 1000; // Base price for the package
  const taxRate = 0.1; // 10% tax
  const [adultPrice, childPrice] = [200, 100]; // Price for adults and children
  
  const addMember = () => {
    setMembers([...members, { name: '', age: '', type: 'adult' }]);
  };

  const updateMember = (index, field, value) => {
    const updatedMembers = members.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setMembers(updatedMembers);
  };

  const handleCouponApply = () => {
    if (coupon === 'DISCOUNT10') {
      setValidCoupon(true);
    } else {
      setValidCoupon(false);
    }
  };

  const calculateTotal = () => {
    const memberPrice = members.reduce(
      (total, member) => total + (member.type === 'adult' ? adultPrice : childPrice),
      0
    );
    const discount = validCoupon ? 0.1 * (basePrice + memberPrice) : 0;
    const taxes = (basePrice + memberPrice - discount) * taxRate;
    return basePrice + memberPrice - discount + taxes;
  };

  return (
    <div className="container mx-auto p-4">
      {/* Package Preview */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Selected Package</h2>
        <p>Name: Trippy Adventure</p>
        <p>Description: A fun-filled adventure</p>
        <p>Base Price: ${basePrice}</p>
        <p>Duration: 3 Days</p>
      </div>

      {/* Adding Members */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Add Members</h2>
        <button
          onClick={addMember}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Member
        </button>

        {members.map((member, index) => (
          <div key={index} className="my-4">
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => updateMember(index, 'name', e.target.value)}
              className="border px-4 py-2 mr-2"
            />
            <input
              type="number"
              placeholder="Age"
              value={member.age}
              onChange={(e) => updateMember(index, 'age', e.target.value)}
              className="border px-4 py-2 mr-2"
            />
            <select
              value={member.type}
              onChange={(e) => updateMember(index, 'type', e.target.value)}
              className="border px-4 py-2"
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
            </select>
          </div>
        ))}
      </div>

      {/* Applying Coupons */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Apply Coupon</h2>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter Coupon Code"
          className="border px-4 py-2"
        />
        <button
          onClick={handleCouponApply}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Apply
        </button>
        {validCoupon ? (
          <p className="text-green-500">Coupon Applied!</p>
        ) : coupon ? (
          <p className="text-red-500">Invalid Coupon</p>
        ) : null}
      </div>

      {/* Price Calculation and Taxes */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Price Summary</h2>
        <p>Base Price: ${basePrice}</p>
        <p>Price for Members: ${members.reduce((total, member) => total + (member.type === 'adult' ? adultPrice : childPrice), 0)}</p>
        {validCoupon && <p>Coupon Discount: 10%</p>}
        <p>Taxes: ${(calculateTotal() * taxRate).toFixed(2)}</p>
        <p className="font-bold">Total Price: ${calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
}
