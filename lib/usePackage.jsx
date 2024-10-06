import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const usePackage = (selectedPackage) => {
    const [error, setError] = useState(null);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["package", selectedPackage?.id],
        queryFn: async () => {
            if (!selectedPackage?.id) {
                throw new Error("No package selected");
            }
            const response = await fetch(`api/products/${selectedPackage.id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch package");
            }
            return response.json();
        },
        enabled: !!selectedPackage?.id, // Only run the query if a package ID is present
    });

    return { data, refetch, isLoading, error };
};

export default usePackage;
