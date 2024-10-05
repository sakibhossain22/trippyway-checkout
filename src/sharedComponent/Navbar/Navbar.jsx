import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between bg-white text-black p-4">
            <div>
                <h1 className="font-bold text-3xl">TrippyWay</h1>
            </div>
            <div className="flex items-center justify-center gap-5">
                <button>
                    <Link className="" href={'/'}>All Packages</Link>
                </button>
                <button>
                    <Link href={'/cart'}>Cart</Link>
                </button>
            </div>
        </div>
    );
};

export default Navbar;