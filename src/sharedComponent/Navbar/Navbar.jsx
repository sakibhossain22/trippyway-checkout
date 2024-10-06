import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between bg-white shadow-md text-black p-4">
            <div>
                <Link href={'/'} className="font-bold text-2xl hover:text-red-600 transition duration-300">
                    Trippy <span className="text-red-600">Way</span>
                </Link>
            </div>
            <div className="flex items-center justify-center gap-5">
                <Link href={'/'} className="px-4 py-2  rounded transition duration-300">
                    All Packages
                </Link>
                <Link href={'/cart'} className="px-4 py-2  text-black rounded hover:bg-gray-300 transition duration-300">
                    Cart
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
