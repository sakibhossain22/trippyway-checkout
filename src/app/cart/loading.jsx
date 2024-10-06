"use client"
import loadingImage from "../../../asset/loading.gif"
import Image from "next/image";

const loading = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-white">
                <Image
                    src={loadingImage}
                    alt="loader"
                    width={50}
                    height={50}
                    className="w-1/6"
                />
            </div>;
        </div>
    );
};

export default loading;