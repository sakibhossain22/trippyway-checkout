"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { IoIosStar } from "react-icons/io";

const Page = ({ params }) => {
    const [packData, setPackData] = useState(null); // Treating as single object
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling
    const [color, setColor] = useState('bg-red-600')
    const [textColor, setTextColor] = useState('text-red-600')
    const [starColor, setStarColor] = useState('red')

    useEffect(() => {
        async function fetchPackageById(id) {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) throw new Error('Failed to fetch package');
                const data = await response.json();
                setPackData(data);
            } catch (error) {
                console.error('Error fetching package:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (params?.id) {
            fetchPackageById(params.id);
        }
    }, [params?.id]);

    // Loading and error handling
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const handleRed = () =>{
        setColor('bg-red-600')
        setTextColor('text-red-600')
        setStarColor('red')

    }
    const handleGreen = () =>{
        setColor('bg-green-600')
        setTextColor('text-green-600')
        setStarColor('green')

    }
    const handlePurple = () =>{
        setColor('bg-purple-600')
        setTextColor('text-purple-600')
        setStarColor('purple')


    }
    const handleYellow = () =>{
        setColor('bg-yellow-600')
        setTextColor('text-yellow-600')
        setStarColor('yellow')


    }
    return (
        <div className="p-8 bg-gray-100 h-screen flex items-center justify-center">
            {packData ? (
                <div className={`grid grid-cols-12 gap-6 rounded-2xl p-4 shadow-lg overflow-hidden}`}>
                    <div className="col-span-7">
                        <Image className="rounded-lg w-full h-full object-cover" width={300} height={300} src={packData?.image} alt={packData?.name} />
                    </div>
                    <div className="col-span-5 flex flex-col justify-between">
                        <h1 className={`${color} p-2 rounded font-bold text-xl`}>Online + App-Only Price</h1>
                        <h3 className={`text-3xl mt-3 mb-3 text-black font-semibold ${textColor}`}>{packData.name}</h3>
                        <p className="text-gray-700 mb-2 text-sm">{packData.description + packData.description}</p>
                        <div></div>
                        <div className="">
                            <StarRatings starHoverColor="yellow"
                                rating={6}
                                starRatedColor={`${starColor}`}
                                numberOfStars={6}
                                name='rating'
                                starDimension="20px"
                                >
                            </StarRatings>
                            <IoIosStar />

                        </div>
                        <div>
                            <p className="text-lg text-gray-950 font-black">${packData.basePrice}</p>
                        </div>
                        <p className="font-bold text-black">Duration: {packData.duration}</p>
                        <hr className="border-2 bg-black my-2" />
                        <div>
                            <h1 className="text-black font-bold text-xl">Color Button</h1>
                            <div className="flex items-center gap-10 my-5">
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
                        <div className="">
                            <Link href={`/package/${packData?.id}`}>
                                <button className={`w-full hover:text-white text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200 ${color}`}>
                                    Add To Cart
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            ) : (
                <p>No package found</p>
            )}
        </div>
    );
};



export default Page;
